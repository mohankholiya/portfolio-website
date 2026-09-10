"""Check the generated static site without network access or third-party packages."""
import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit, unquote
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1] / 'dist'
ORIGIN = 'https://mohankholiya.co.in'

class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path = path
        self.ids = set()
        self.links = []
        self.h1 = 0
        self.canonical = []
        self.description = []
        self.in_schema = False
        self.schema = ''
        self.feed(path.read_text())

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get('id'):
            assert a['id'] not in self.ids, f'Duplicate id: {self.path}: {a["id"]}'
            self.ids.add(a['id'])
        self.h1 += tag == 'h1'
        for key in ('href', 'src'):
            if a.get(key):
                self.links.append(a[key])
        if a.get('srcset'):
            self.links.extend(entry.strip().split()[0] for entry in a['srcset'].split(','))
        if tag == 'link' and a.get('rel') == 'canonical':
            self.canonical.append(a['href'])
        if tag == 'meta' and a.get('name') == 'description':
            self.description.append(a.get('content', ''))
        if tag == 'script' and a.get('type') == 'application/ld+json':
            self.in_schema = True

    def handle_endtag(self, tag):
        if tag == 'script':
            self.in_schema = False

    def handle_data(self, data):
        if self.in_schema:
            self.schema += data

pages = {path: Page(path) for path in ROOT.rglob('*.html')}
assert len(pages) == 10, f'Expected 10 HTML pages, found {len(pages)}'
checked = 0
for path, page in pages.items():
    relative = path.relative_to(ROOT).as_posix()
    route = '/' + relative.removesuffix('index.html')
    assert page.h1 == 1, f'Expected one H1: {path}'
    assert len(page.description) == 1 and page.description[0], f'Missing description: {path}'
    assert len(page.canonical) == 1, f'Missing canonical: {path}'
    if relative != '404.html':
        assert page.canonical[0] == ORIGIN + route, f'Wrong canonical: {path}'
    assert json.loads(page.schema)['@type'] == 'Person'
    for link in page.links:
        target = urlsplit(urljoin(ORIGIN + route, link))
        if target.scheme not in ('https', 'http') or target.netloc != urlsplit(ORIGIN).netloc:
            continue
        local = ROOT / unquote(target.path).lstrip('/')
        if local.is_dir():
            local /= 'index.html'
        assert local.is_file() and local.stat().st_size, f'Broken link: {relative}: {link}'
        fragment = unquote(target.fragment).split('?')[0]
        if fragment and local in pages:
            assert fragment in pages[local].ids, f'Broken fragment: {relative}: {link}'
        checked += 1

for name in ('resume.pdf', 'Mohan_Kholiya_Industry_Resume.pdf'):
    assert (ROOT / name).read_bytes().startswith(b'%PDF-'), f'Invalid PDF: {name}'
for name in ('inter-latin.woff2',):
    assert (ROOT / 'fonts' / name).read_bytes().startswith(b'wOF2'), f'Invalid font: {name}'
sitemap = ET.parse(ROOT / 'sitemap.xml')
assert len(sitemap.getroot()) == 9
print(f'PASS: {len(pages)} pages; {checked} local references; metadata, structured data, sitemap, PDFs and fonts.')

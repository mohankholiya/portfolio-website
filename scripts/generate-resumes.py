"""Generate the public resumes from shared portfolio content (ReportLab required)."""
import json
import subprocess
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads(subprocess.check_output([
    "node", "--experimental-strip-types", "--input-type=module", "-e",
    "import * as data from './src/content/site.ts'; console.log(JSON.stringify(data))"
], cwd=ROOT, text=True))
FONT_DIR = Path('/usr/share/fonts/truetype/dejavu')
for name, filename in [('Resume', 'DejaVuSans.ttf'), ('ResumeBold', 'DejaVuSans-Bold.ttf')]:
    pdfmetrics.registerFont(TTFont(name, str(FONT_DIR / filename)))
pdfmetrics.registerFontFamily('Resume', normal='Resume', bold='ResumeBold')
INK = colors.HexColor('#0c2438')
ACCENT = colors.HexColor('#8a4e18')
STYLES = {
    'name': ParagraphStyle('name', fontName='ResumeBold', fontSize=25, leading=31, textColor=INK, spaceAfter=8),
    'subtitle': ParagraphStyle('subtitle', fontName='ResumeBold', fontSize=11, leading=16, textColor=ACCENT, spaceAfter=8),
    'contact': ParagraphStyle('contact', fontName='Resume', fontSize=8.7, leading=13, spaceAfter=14),
    'section': ParagraphStyle('section', fontName='ResumeBold', fontSize=10, leading=15, textColor=ACCENT, spaceBefore=13, spaceAfter=8, keepWithNext=True),
    'job': ParagraphStyle('job', fontName='ResumeBold', fontSize=10.5, leading=15, textColor=INK, spaceBefore=8, spaceAfter=3, keepWithNext=True),
    'meta': ParagraphStyle('meta', fontName='Resume', fontSize=9.1, leading=13, textColor=INK, spaceAfter=7, keepWithNext=True),
    'body': ParagraphStyle('body', fontName='Resume', fontSize=9.7, leading=14.4, textColor=INK, spaceAfter=7),
    'bullet': ParagraphStyle('bullet', fontName='Resume', fontSize=9.7, leading=14.4, textColor=INK, leftIndent=10, firstLineIndent=-10, spaceAfter=6),
}

def p(text, style='body'):
    return Paragraph(escape(text).replace('\n', '<br/>'), STYLES[style])

def bullet(text):
    return p('- ' + text, 'bullet')

def footer(canvas, doc):
    canvas.setStrokeColor(colors.HexColor('#d7dee4'))
    canvas.line(44, 38, A4[0] - 44, 38)
    canvas.setFont('Resume', 8)
    canvas.setFillColor(INK)
    canvas.drawString(44, 25, 'Mohan Kholiya | mohankholiya.co.in | September 2026')
    canvas.drawRightString(A4[0] - 44, 25, str(doc.page))

JOB_BULLETS = [
    [
        'Led a pre-RFP assessment of $233M in utility contractor spend, analysing approximately 565,000 transactions across 482 rate codes. Identified $4.9M-$6M of annual opportunity against the selected assessment benchmark; recommendations informed RFP design. This was an identified opportunity, not realised savings.',
        'Contributed benchmarking, cost-driver analysis and executive synthesis to a $2.2B upstream capital competitiveness review using a 27-project peer set. Team recognised with the Q3 Innovation Award.',
        'Developed utility supply-chain operating-model analysis and category-intelligence reports connecting workload, market information and costs to commercial decisions.',
    ],
    [
        'Owned GBP 100M of annual civil-infrastructure category spend and led a team of 5+ buyers across sourcing, contract renewals and supplier governance.',
        'Secured approximately GBP 2M of total-cost optimisation in a service-delivery renewal through should-cost modelling and negotiation, retaining the incumbent and protecting service continuity. Category spend is separate from the renewal value.',
        'Led source-to-pay digital transformation, standardising contracting governance, approval workflows and compliance across Finance, Engineering and Operations.',
    ],
    [
        'Delivered approximately $4M in CapEx sourcing savings across EPC, surface facilities, and drilling and completions for an Indian upstream operator.',
        'Led category strategy and end-to-end sourcing, including qualification, RFx, TCO-based evaluation, negotiation and award in SAP Ariba with a cross-functional team of four.',
        'Embedded category playbooks and supplier-management routines; received the Business Partner Employee Award for FY 2022-23.',
    ],
    [
        'Managed an approximately $100M annual procurement and contracting portfolio supporting offshore drilling and MWD operations for ONGC and OIL India contracts.',
        'Built a 50-vendor ecosystem with 10 OEM rate contracts and led a 10+ member cross-functional team. Global sourcing and supplier audits covered the Middle East, US, UK, Singapore and China.',
    ],
    [
        'Directed approximately $50M of annual sourcing for 2,000 HP onshore drilling rigs, leading a 4+ member cross-functional team and negotiating a $30M rig-equipment contract.',
    ],
    [
        'Led EPC procurement for RGGVY power-grid turnkey projects, covering BOQs, technical approvals, contractor selection and quality compliance.',
    ],
]

def job(index):
    item = DATA['experience'][index]
    title = item['role'].replace('\u2014', '-')
    period = item['period'].replace('\u2013', '-')
    return [p(item['company'], 'job'), p(f'{title} | {period}', 'meta')] + [bullet(t) for t in JOB_BULLETS[index]]

for kind, filename in [('consulting', 'resume.pdf'), ('industry', 'Mohan_Kholiya_Industry_Resume.pdf')]:
    title = 'Procurement & Supply Chain Advisory' if kind == 'consulting' else 'Procurement Leadership & Category Management'
    summary = (
        'Procurement and supply chain advisor with 16+ years across energy, utilities, oil and gas, infrastructure and telecom. Combines consulting delivery at Wood Mackenzie and Accenture with in-house category and operational accountability. Focused on cost diagnostics, capital benchmarking, contracting strategy and practical recommendations for senior stakeholders.'
        if kind == 'consulting' else
        'Procurement leader with 16+ years across energy, oil and gas, infrastructure and telecom. Combines in-house category ownership at BT Group and operational supply-chain leadership in drilling and power with consulting at Wood Mackenzie and Accenture. Experienced in strategic sourcing, team leadership, supplier development and source-to-pay transformation.'
    )
    skills = (
        'Capital cost benchmarking | Spend and rate analytics | Should-cost and TCO modelling | Category intelligence | Contracting strategy | Operating-model diagnostics | Executive synthesis | Analyst coaching'
        if kind == 'consulting' else
        'Category ownership | Strategic sourcing and RFx | Contract negotiation | Supplier development and governance | CapEx procurement | Source-to-pay transformation | Global sourcing | Cross-functional team leadership'
    )
    story = [p('MOHAN KHOLIYA', 'name'), p(title, 'subtitle'),
             p('Gurugram, India | +91 9990433916 | mohan.kholiya@gmail.com\nlinkedin.com/in/mohankholiya | mohankholiya.co.in', 'contact'),
             p('PROFILE', 'section'), p(summary), p('CORE CAPABILITIES', 'section'), p(skills),
             p('PROFESSIONAL EXPERIENCE', 'section')]
    story.extend(job(0))
    story.extend(job(1))
    story.extend([PageBreak(), p('PROFESSIONAL EXPERIENCE / CONTINUED', 'section')])
    for index in range(2, 6):
        story.extend(job(index))
    story.extend([
        p('EDUCATION & CERTIFICATIONS', 'section'),
        p('MBA, Power Management | UPES, Dehradun | 2009\nB.Sc., Physics, Chemistry & Mathematics | Kumaun University | 2006\nMITx SC0x Supply Chain Analytics (2026) and SC1x Fundamentals (2025): completed courses in the MicroMasters programme.\nSupply Chain Management certification | MSME | 2013'),
        p('ANALYTICS & INDEPENDENT BUILDS', 'section'),
        p('SAP Ariba | SAP MM | Oracle ERP | Alteryx | Power BI | Advanced Excel\nIndependent procurement tools for should-cost modelling and category intelligence, combining structured calculations with AI-assisted research.'),
        p('RECOGNITION', 'section'),
        p('Q3 Innovation Award, Wood Mackenzie (2025) | Business Partner Employee Award (FY 2022-23) | Distinguished Contributor Award, Quippo Oil & Gas (2015-16).'),
    ])
    output = ROOT / 'public' / filename
    SimpleDocTemplate(str(output), pagesize=A4, topMargin=39, bottomMargin=51,
                      leftMargin=44, rightMargin=44, title=f'Mohan Kholiya - {title}',
                      author='Mohan Kholiya').build(story, onFirstPage=footer, onLaterPages=footer)
    print(output)

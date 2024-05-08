from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import Table, TableStyle
from .models import Invoice
from django.core.files.base import ContentFile


def generate_invoice_pdf(order, response):
    pdf_filename = f"Invoice_{order['invoice_num']}.pdf"
    c = canvas.Canvas(response, pagesize=letter)

    # Add a margin at the top
    top_margin = 50

    # Set up the title
    c.setFont("Helvetica-Bold", 20)
    title_text = "Invoice"
    title_width = c.stringWidth(title_text, "Helvetica-Bold", 16)
    c.drawString((letter[0]-title_width)/2, letter[1]-top_margin, title_text)



    # Add order details
    c.setFont("Helvetica", 12)
    c.drawString(100, letter[1]-top_margin-40, "Company Name : Sportify E-Commerce ")
    c.drawString(100, letter[1]-top_margin-60, f"Address: {order['user']['address']}")
    c.drawString(100, letter[1]-top_margin-80, f"Username: {order['user']['username']}")
    c.drawString(100, letter[1]-top_margin-100, f"Invoice Date: {order['created_at']}")
    c.drawString(100, letter[1]-top_margin-120, f"Invoice Number: {order['invoice_num']}")

    data = [['Product', 'Quantity', 'Price']]
    for item in order['orderitems']:
        data.append([item['product']['title'], str(item['quantity']), f"${item['product']['price'] * item['quantity']}"])

    table = Table(data, colWidths=[300, 100, 100], hAlign='LEFT')
    table.setStyle(TableStyle([('GRID', (0, 0), (-1, -1), 1, colors.black)]))
    table.wrapOn(c, 0, 0)
    table.drawOn(c, 100, letter[1]-top_margin-180)

    # Calculate total price
    total_price = sum(item['product']['price'] * item['quantity'] for item in order['orderitems'])
    c.drawString(100, letter[1]-top_margin-200, f"Total Price: ${total_price}")

    # Save the PDF
    c.save()

    return pdf_filename
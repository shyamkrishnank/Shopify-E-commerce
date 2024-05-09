from django.core.mail import send_mail
from django.core.mail import EmailMessage

from django.conf import settings



def send_mail(csv_data,mail):
    subject = 'Order CSV Report'
    body = 'Attached is the CSV report of orders.'
    from_email = settings.EMAIL_HOST
    to_email = [mail]  # Replace with recipient's email
    email = EmailMessage(subject, body, from_email, to_email)
    email.attach('orders.csv', csv_data, 'text/csv')
    email.send()
    return {'status': 'success', 'message': 'Email sent successfully'}
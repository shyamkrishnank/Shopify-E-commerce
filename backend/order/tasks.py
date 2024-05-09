import csv
from io import StringIO
from celery import shared_task
from django.utils import timezone
from .models import Order
from .mail import send_mail

@shared_task(bind=True)
def generate_csv(self,mail):
        try:
            orders = Order.objects.all()
            if orders:
                csv_buffer = StringIO()
                csv_writer = csv.writer(csv_buffer)
                csv_writer.writerow(['Order ID', 'Customer','Order Date','Payment Type', 'Total Price', 'Status'])
                for order in orders:
                    csv_writer.writerow([order.id, order.user.username,order.created_at.astimezone(timezone.get_current_timezone()).strftime('%d/%m/%Y %I:%M %p'), order.payment_type,order.total_price, order.status])
                csv_buffer.seek(0)
                csv_data = csv_buffer.getvalue()
                send_mail(csv_data, mail)
                return "Success"

            else:
                return {'status': 'error', 'message': 'No orders found'}
        except Exception as e:
            return {'status': 'error', 'message': f'Error generating CSV file: {e}'}

import csv
from io import StringIO
from celery import shared_task
from .models import Order
from .mail import send_mail

@shared_task(bind=True)
def generate_csv(self):
        try:
            orders = Order.objects.all()
            if orders:
                csv_buffer = StringIO()
                csv_writer = csv.writer(csv_buffer)
                csv_writer.writerow(['Order ID', 'Customer', 'Total Price', 'Status'])
                for order in orders:
                    csv_writer.writerow([order.id, order.user.username, order.total_price, order.status])
                csv_buffer.seek(0)
                csv_data = csv_buffer.getvalue()
                send_mail(csv_data)
                return "Success"

            else:
                return {'status': 'error', 'message': 'No orders found'}
        except Exception as e:
            return {'status': 'error', 'message': f'Error generating CSV file: {e}'}

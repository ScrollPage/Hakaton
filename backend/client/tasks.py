from django.conf import settings
from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags

from backend.celery import app as celery_app

@celery_app.task
def send_activation_email(user_email, key):
    title = 'Активация аккаунта'
    content = f'Перейдите по ссылке, чтобы завершить регистрацию: {settings.REACT_DOMAIN}/account-activation?token={key}'
    html_content = render_to_string(
        'email_template.html',
        {'title': title, 'content': content}
    )
    text_content = strip_tags(html_content)
    email = EmailMultiAlternatives(
        'Подтверждение регистрации',
        text_content,
        'Mars Berry Tracker',
        [user_email],
    )
    email.attach_alternative(html_content, 'text/html')
    email.send()
    # send_mail(
    #     'Подтверждение регистрации',
    #     f'Перейдите по ссылке, чтобы завершить регистрацию: {settings.REACT_DOMAIN}/account-activation?token={key}',
    #     'Mars Berry Tracker',
    #     [user_email],
    #     fail_silently=False
    # )
from django.conf.urls import url
from knowdb.views import answer,edit

urlpatterns = [
    url(r'answer',answer),
    url(r'edit',edit)
]

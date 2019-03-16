# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Knowledge(models.Model):
    name = models.CharField(max_length=200)
    answer = models.CharField(max_length=500)

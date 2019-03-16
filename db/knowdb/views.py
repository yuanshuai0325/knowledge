# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import JsonResponse
from knowdb.models import Knowledge

import random
# Create your views here.

def answer(request):
    ret = {}
    data = Knowledge.objects.all()
    num = random.choice(range(1,int(data.count())+1))
    ret['name'] = data[num-1].name
    ret['answer'] = data[num-1].answer
    print ret
    return JsonResponse({'exec':'true','ret':ret})



def edit(request):
    name = request.POST.get('name')
    answer = request.POST.get('answer')
    print name,answer
    try:
        adddata = Knowledge(name=name,answer=answer)
        adddata.save()
        return JsonResponse({'exec':'true','ret':'提交成功'})
    except Exception as e:
        return JsonResponse({'exec':'false','ret':'提交失败'})

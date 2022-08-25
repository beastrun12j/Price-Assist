from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *
from django.views.decorators.csrf import csrf_exempt
 
# Create your views here.
class PredictionView(APIView):

    serializer_class = PredictionSerializer
    def get(self, request):
        return Response({'prediction': Prediction.objects.last().prediction })

    @csrf_exempt
    def post(self, request):
        serializer = PredictionSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


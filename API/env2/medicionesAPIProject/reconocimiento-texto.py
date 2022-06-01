# Librerías para el reconocimiento de caracteres
import cv2
import pytesseract

# Librerías para controlar la cámara
from picamera import PiCamera
from time import sleep

camera = PiCamera()
#camera.resolution = (800, 600)
#camera.start_preview()
#sleep(4)
#camera.capture('/home/embebidos1/foto_prueba.jpg')
#camera.stop_preview()

# Se lee la imagen y se aplica escala de grises
#img = cv2.imread("/home/embebidos1/foto_prueba.jpg", cv2.IMREAD_GRAYSCALE)

img = cv2.imread("/home/embebidos1/foto_prueba.jpg", 0)
img = cv2.medianBlur(img, 5)
th3 = cv2.adaptiveThreshold(img,255,cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY,11,2)

# Se cambia la resolución de la imagen
#th3 = cv2.resize(th3, (800, 600))

# Se corta la imagen
#cropped = th3[200:250, 200:550]

# Se muestra la imagen
cv2.imshow("Image", th3)

# Se obtiene el texto de la imagen
text = pytesseract.image_to_string(th3)

# Se imprime el texto
#num_med = text[0]+text[1]+text[2]+text[3]+text[4]+text[5]+text[6]
#num = text[:len(text)-3]

print(text)
#print(num_med)

#medidor = text[:-1]
#numero_medidor = medidor[:-1]

#print(numero_medidor)

# Teclas para salir de la ventana que muestra la imagen
cv2.waitKey(0)
cv2.destroyAllWindows()
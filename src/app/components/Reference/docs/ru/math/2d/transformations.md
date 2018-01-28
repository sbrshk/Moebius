## Преобразования

### Применение аффинных преобразований к модели

Пусть карта вершин модели задана матрицей *Vertices*. Применение аффинного преобразования, заданного матрицей *А*, осуществляется по формуле

<p align="center"><img src="https://github.com/cellardoor42/AffineTransform/blob/master/src/app/components/Reference/docs/ru/math/2d/5.gif?raw=true"></p>



### Организация последовательного применения аффинных преобразований к модели

#### Первый случай: модель не имеет постоянной точки опоры

Пусть карта вершин модели задана матрицей *Vertices = Vertices<sub>0</sub>*. К модели последовательно применяются аффинные преобразования, заданные матрицами *A<sub>1</sub>*, *A<sub>2</sub>*, ..., *A<sub>s</sub>*. Обозначим *Vertices<sub>j</sub>* карту вершин модели после применения j-го преорбазования (*j = 1, 2, ..., s*).

##### Первый способ

В памяти хранится текущая карта вершин модели. При применении очередного преобразования выполняется следующая операция:

<p align="center"><img src="https://github.com/cellardoor42/AffineTransform/blob/master/src/app/components/Reference/docs/ru/math/2d/6.gif?raw=true"></p>

##### Второй способ

В памяти хранится исходная карта вершин и матрица накопленного аффинного преобразования *A<sup>(j)</sup>*:

<p align="center"><img src="https://github.com/cellardoor42/AffineTransform/blob/master/src/app/components/Reference/docs/ru/math/2d/7.gif?raw=true"></p>

При применении очередного аффинного преобразования выполняются следующие операции:

<p align="center"><img src="https://github.com/cellardoor42/AffineTransform/blob/master/src/app/components/Reference/docs/ru/math/2d/8.gif?raw=true"></p>
# Модели

**Модель** представляет собой объект следующей структуры:

- *карта вершин (матрица вершин)* - вещественная матрица, столбцы которой содержат мировые однородные координаты соответствующих вершин:

  <p align="center"><img src="https://github.com/cellardoor42/AffineTransform/blob/master/src/app/components/Reference/docs/ru/math/2d/1.gif?raw=true"></p>

- *карта ребер (матрица ребер)* - может быть задана одним из двух способов:

  - целочисленная матрица, строки которй содержат пары номеров вершин, соединенных ребрами:

    <p align="center"><img src="https://github.com/cellardoor42/AffineTransform/blob/master/src/app/components/Reference/docs/ru/math/2d/2.gif?raw=true"></p>

  - матрица смежности

    ​


> В данной реализации используется способ задания модели с картой ребер в виде пар номеров вершин.
<h2>Slot Machine</h2>

<p>Тренировка и развитие навыков программирования - неотъемлемая часть хорошего специалиста. Разработка игр, на мой взгляд, является наилучшим инструментом обучения. Именно в game dev можно встретить самые сложные алгоритмы, высокие требования к производительности, нестандартные задачи. Большинство современных игр бесполезны и вредны.  Но навыки, полученные в ходе разработки, могут быть применены в действительно стоящих проектах.  Поэтому game dev, как мне кажется, больше полезен для развития навыков программирования и проектирования. Любому разработчику хоть один раз стоит написать простую игру.</p>

<p>Для обучения возьмем небольшую задачу – реализовать игровой автомат. В первый раз крайне нежелательно использовать какие-либо высокоуровневые библиотеки, фреймворки и движки. Иначе можно не понять всю специфику и круг решаемых задач. </p>

<p>В ходе разработки понадобятся следующие технологии: html, css, javascript, замыкания, паттерн проектирования <a href="http://largescalejs.ru/module-pattern/" target="_blank">модуль</a>, методология SPA-приложений, библиотека <a href="http://requirejs.org/" target="_blank">RequireJs</a>, рекомендации <a href="http://usejsdoc.org/" target="_blank">JsDoc</a>, слоистая архитектура.</p>

<p>Алгоритм должен быть максимально гибким.  Для этого разделим задачу на части. Каждая часть должна быть независима от другой, насколько это возможно. Предполагается, что слои могут быть выполнены разными программистами.</p>

<ul>
<li>Cлой (page)  – работа со страницей (создание холста, настройка его размеров, подписка на события, вставка кнопок, управление их доступностью,  загрузка изображений и пр.)</li>
<li>Cлой (game) – игровая логика, инкапсулирует основные расчеты. Интерфейс, доступный наружу, представляет собой  методы добавления лотов, начала и остановки игры, параметры счета и флаг старта.</li>
<li>Cлой (draw) – отображение на холсте. Важно отделить рисование от логики игры. Методы прорисовки сцены могут поменяться в зависимости от условий. Например, на носимых устройствах анимация на основе изменения  css-свойств элементов менее энергозатратная, чем с использованием canvas. Если вносить изменения в модуль с игровой логикой, то ненароком можно повредить хорошо отлаженный чужой код. </li>
<li>В отдельный модуль также следует вынести конфигурационный файл.  В больших играх конфигурация состоит из сотен параметров.  В любой момент могут измениться требования. Например, необходимо не три слота, а четыре. Для удобства в этом же модуле произведем расчеты параметров, зависимых от других.</li>
</ul>

<h3>Конфигурация</h3>
<pre>
lots : {
        1 : {
            'src'   : 'img/lots/seven.png',
            'rate'  : 500,
            'type'  : 'seven'
        },
        ...
      }
</pre>
<p>
src   – адрес изображения;<br/>
rate – очки в случае выигрыша;<br/>
type – тип лота.
</p>
<p>
symbolWidth - ширина лота;<br/>               
symbolHeight - высота лота; <br/>  
slotCount - количество слотов (столбцов); <br/>      
lineCount - количество отображаемых строк;<br/>     
centerLine - номер строки выигрыша;<br/>       
speed - скорость движения элементов (смещение за одну итерацию);<br/>           
winAnimationCount - количество кадров для проигрывания анимации выигрыша;<br/>
stopGameDelay - задержка до остановки игры;  <br/>     
stopSlotDelay - задержка между остановкой каждого слота; <br/>     
winAnimationDelay - задержка при проигрывании анимации выигрыша.<br/> 
<br/> 
lotsCount - количество лотов;<br/>  
width - ширина игрового поля;<br/> 
height - высота игрового поля;<br/>         
itemsInSlotAmount - количество элементов в одном слоте;<br/> 
slotHeight - высота слота;<br/> 
duplicateCount - количество дубликатов в слоте.
</p>

<h3>Предварительна загрузка</h3>

<p>Начало игры может быть доступно только после предварительной загрузки всех изображений лотов.</p> 

<h3>Игровая логика</h3>
<p>Основу приложения будет составлять игровая сцена и три главных метода работы с ней.</p>
<ul>
<li>Инициализация сцены</li>
<li>Пересчет сцены</li>
<li>Отображение сцены</li>
</ul>

<p>В нашем случае игровая сцена имеет вид:</p>
<pre>
  {
    "1": 
        {
          "1": {"x": 0, "y": 0, "type": "5"},
          "2": {"x": 0, "y": 144, "type": "4"},
          "3": {"x": 0, "y": 288, "type": "3"},
          ...
        }
    "2": 
        {
          "1": {"x": 266, "y": 0, "type": "2"},
          "2": {"x": 266, "y": 144, "type": "5"},
          "3": {"x": 266, "y": 288, "type": "1"},
          ...
        }
      ...  
  }
</pre>

<p>Имеется несколько слотов, в них случайным образом располагаются элементы, которые в свою очередь описываются координатами “x”,”y” и типом “type”.  На каждой итерации игры к координате “y” всех элементов добавляется смещение. Элементы, которые выходят за пределы видимого игрового поля, переносятся в начало. После каждого пересчета происходит отображение элементов в видимой части поля. И так до тех пор, пока не придет событие остановки от таймера или от кнопки стоп. Но расчеты на этом не останавливаются. Нужно привести все элементы сцены в баланс, т.е. привести в исходное положение. Для этого каждый слот будет иметь три признака. </p>
<p>
  isFinishTime – инициализация остановки;<br/>
  isFinishCalc – остановка расчетов;<br/>
  isFinishDraw – остановка отображения.
</p>

<p>Если флаг isFinishTime принял положительное значение, выполняется проверка остаточного смещения. Если оно меньше конфигурационного, происходит доводка элементов и меняется флаг isFinishCalc. После завершения отображения последней итерации флаг isFinishDraw устанавливается в положительное значение и заканчивается игровой цикл. Затем выполняется проверка выигрыша и победная анимация в случае успеха.</p>

<p><b>Итак, подведем итоги.</b></p>

<p>Основу программирования игр составляют:</p>
<ol>
<li>Продуманная конфигурация;</li>
<li>Предварительная загрузка ресурсов в оперативную память;</li>
<li>Игровая сцена;</li>
<li>Инициализация сцены и сброс временных параметров;</li>
<li>Игровой цикл;</li>
<li>Пересчет сцены на каждой итерации игрового цикла;</li>
<li>Отображение сцены после каждого пересчета;</li>
<li>Экономия ресурсов (частичная перерисовка сцены и пр.);</li>
</ol>

<p>Данный пример демонстрирует классический подход разработки игр и может быть миниатюрной проекцией большого проекта.</p>





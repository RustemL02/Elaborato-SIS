# Note
Il sistema riceve come input il PH rappresentato da 4 bit parte intera e 4 bit parte decimale.
Il PH deve esseere compreso tra 0 e 14.
Il PH neutro è un PH compreso tra 7 e 8.
La soluzione ha un certo PH iniziale, per PH acido si intende un valore strettamente minore di 7 per basico maggiore a 8.
Le due valvole hanno flussi di erogazione differenti:
    - la valvola che eroga la soluzione basica alza la soluzione iniziale di 0.25 a ogni ciclo di clock;
    - la valvola che eroga la soluzione acida abbassa la soluzione iniziale di 0.50 a ogni ciclo di clock.

## Interfaccia
L'interfaccia del circuito è suddivisa tra i seguenti input e output:
- Input:
    - RST (1 bit);
    - START (1 bit);
    - PH (8 bit, 4 parte intera e 4 per la parte decimale).
- Output:
    - FINE_OPERAZIONE (1 bit);
    - ERRORE_SENSORE (1 bit);
    - VALVOLA_ACIDO (1 bit);
    - VALVOLA_BASICO (1 bit);
    - PH_FINALE (8 bit);
    - NCLK (8 bit);
Input e output devono essere definiti nell'ordine specificato (quelle con più bit, il bit significativo a SX).

## Meccanismo
Il meccanismo funziona nel seguente modo:
- quando il segnale RST viene alzato, il sistema torna da un qualsiasi stato allo stato di Reset, mettendo tutte le porte in input a zero;
- per procedere, il sistema riceve in input il segnale di START, con valore 1, e il segnale del PH iniziale per un solo ciclo di clock. Il sistema potrà quindi procedere con la fase di elaborazione;
- se la soluzione iniziale è acida, viene aperta la valvola della soluzione basica, mettendo a 1 il relativo output (VALVOLA_BASICA). Analogamente, se la soluzione iniziale è basica, viene aperta la valvola della soluzione acida mettendo a 1 la porta VALVOLA_ACIDO;
- il sistema mantiene aperte le valvole per il tempo neccessario al raggiungimento della soglia di neutralità (calcolata dal sistema);
- una volta terminata l'operazione, il sistema deve chiudere tutte le valvole aperte, riportare il PH finale sulla porta in output PH_FINALE e alzare la porta di FINE_OPERAZIONE;
- la porta NCLK riporta quanti cicli di clock sono stati neccessari per portare la soluzione a neutralità;
- se il valore del PH non è valido (> 14) il sistema deve riportare l'errore alzando l'output ERORRE_SENSORE.

## Vincoli
- Le porte di input e di output devono rispettare l'ordine definito ed essere collegate al rispettivo sotto modulo.
- Il Datapath deve essere unico: se volete definire più Datapath, questi devono essere inglobati in un unico modello.
- > É compito della FSM identificare se il PH della soluzione iniziale sia acido o basico!


---
# Domande
- [x] Dentro l'FSM va anche il valore del PH? Il problema è che creerebbe un casino essendo che ha 255 varianti e quindi avremmo altrettanti stati.
- [ ] Perché rappresentare i cicli di clock a 8 bit quando sono neccessari 5? Non sarebbe un po superfluo? (Forse per rappresentare tutto con potenze di 2)
- [ ] Email inviata il 01/02/2022


---
# FSM

## Controllo PH
Per controllare se il PH è acido o basico basta utilizzare sfruttare il fatto che se il bit più significativo è a 0 allora è **ACIDO** se invece il bit più significativo è a 1 allora è **BASICO**.

|   BIT   | STATO|
| :-----: | :--: |
| 0 0 0 0 | *AC* |
| 0 0 0 1 | *AC* |
| 0 0 1 0 | *AC* |
| 0 0 1 1 | *AC* |
| 0 1 0 0 | *AC* |
| 0 1 0 1 | *AC* |
| 0 1 1 0 | *AC* |
| 0 1 1 1 | *NE* |
| 1 0 0 0 | *NE* |
| 1 0 0 1 | *BA* |
| 1 0 1 0 | *BA* |
| 1 0 1 1 | *BA* |
| 1 1 0 0 | *BA* |
| 1 1 0 1 | *BA* |
| 1 1 1 0 | *BA* |
| 1 1 1 1 | *BA* |


Sfruttando questo fatto possiamo dedurre che utilizzando due stati possiamo capire se il PH iniziale è **acido** oppure **basico**.
Quindi avremmo bisogno di 2 stati oltre al ***RESET*** di nome ***ACIDO*** e ***BASICO***.

## INPUT FSM
I 3 input obbligatori della FSM sono:
1. ***RST***: se a *1* allora da qualsiasi stato si ritorna allo stato di ***RESET***;
1. ***START***: se a *1* allora il cicuito prende il PH iniziale;
1. ***PH[8]***: indica il valore del PH iniziale.

Mentre gli input che derivano dal collegamento tra FSM e Datapath sono:
1. ***ERRORE***: indica se è presente o meno un errore (*1* = ERRORE, *0* = NO ERRORE);
1. ***CONTROLLO_NEUTRO***: indica se si è raggiunta la neutralità della soluzione (*1* = NEUTRALE, *0* = NON NEUTRALE).

> *RST* *START* *PH[8]* *ERRORE* *NEUTRALE*

## OUTPUT FSM
I 4 output obbligatori del FSM sono:
1. ***FINE_OPERAZIONE***: se a *1* allora abbiamo raggiunto uno stato di **NEUTRO**, se a *0* no;
1. ***ERRORE_SENSORE***: se a *1* allora abbiamo raggiunto lo stato di **ERRORE**, se a *0* no;
1. ***VALVOLA_ACIDO***: se a *1* allora abbiamo raggiunto lo stato di **BASICO**, se a *0* no;
1. ***VALVOLA_BASICO***: se a *1* allora abbiamo raggiunto lo stato di **ACIDO**, se a *0* no.

Mentre gli output che derivano dal collegamento tra FSM e Datapath sono:
1. ***RESET***: serve per capire quando resettare i registri dentro il Datapath (*1* = RESET, *0* = NO RESET);
1. ***START***: serve per sapere quando registrare il valore in input del PH nel registro (*1* = REGISTRO IL PH, *0* = NON REGISTRO IL PH);
1. ***TIPO_PH***: serve per capire se la soluzione iniziale era acida oppure basica (*0* = ACIDO, *1* = BASICO).

## STATI FSM
Per ora abbiamo dedotto di utilizzare 3 stati per l'FSM ***RESET***, ***ACIDO*** e ***BASICO***. Ma ci siamo accorti che servono altri 2 stati uno per segnalare l'errore, e uno per segnalare il raggiungimento della neutralità quindi avremmo bisogno dello stato ***ERRORE*** e ***NEUTRO***.

Stati:
1. ***RESET***: è lo stato di reset al quale l'FSM torna per richiedere l'input;
1. ***ACIDO***: è lo stato che indica che il liquido è acido quindi bisogna buttare sostanza basica;
1. ***BASICO***: è lo stato che indica che il liquido è basico quindi bisogna buttare sostanza acida;
1. ***ERRORE***: è lo stato che indica la presenza di errore;
1. ***NEUTRO***: è lo stato che indica la neutralità della soluzione.


---
# Datapath

## Componenti Datapath
- REGISTRO 8 bit;
- SOMMATTORE 8 bit;
- SOTTRATTORE 8 bit;
- MULTIPLEXER 1 bit; 
- MULTIPLEXER 8 bit;
- DEMULTIPLEXER 8 bit;
- MAGGIORE 8 bit;
- MINORE-UGUALE 8 bit;

## INPUT Datapath
L'input obbligatorio del Datapath è:
1. ***PH[8]***: indica il valore del PH iniziale;

Mentre gli input che derivano dal collegamento tra Datapath e FSM sono:
1. ***RESET***: se a *1* allora da qualsiasi stato si ritorna allo stato di ***RESET***;
1. ***START***: se a *1* allora il cicuito prende il PH iniziale;
1. ***TIPO_PH***: indica se il PH è acido 0, basico 1.

## OUTPUT Datapath
I 2 output obligatori del Datapath sono:
1. ***PH_FINALE[8]***: che indica il risultato raggiunto quando il PH raggiunge un valore di neutralità;
1. ***NCLK[8]***: indica il numero di cicli di clock neccessari per portare la soluzione a neutralità.

Mentre gli ouput che derivano dal collegamento tra Datapath e FSM sono:
1. ***ERRORE***: indica se è presente o meno un errore (*1* = ERRORE, *0* = NO ERRORE);
1. ***CONTROLLO_NEUTRO***: indica se si è raggiunta la neutralità della soluzione (*1* = NEUTRALE, *0* = NON NEUTRALE).


---
# Appunti

## Liquido
Se il liquido è acido allora devo aggiungere 0.50, se invece è basico allora devo aggiungere 0.25.

0.50 in binario è *0000.1000*
0.25 in binario è *0000.0100*


---
# Osservazioni
Dopo aver immesso l'input il prof per simulare utilizza
```blif
sim 0 0 0 0 0 0 0 0 0 0
```

## Numero massimo di cicli che può compiere il circuito
Presupponiamo di avere il valore massimo possibile, **14**, per raggiungere la soglia di neutralità cioè compreso tra *7* e *8* allora dobbiamo sottrarre *6* a *14*, per arrivare a *8* sottraendo solo *0.25* a ogni ciclo di clock dobbiamo compiere ***24 cicli di clock*** (*6 / 0.25*).

*14 = 0 0 0 0 . 0 0 0 0*

*8 = 1 0 0 0 . 0 0 0 0*

*6 = 0 1 1 0 . 0 0 0 0*

*6 / 0.25 = 24*

*24 = 1 1 0 0 0*

> Essendo che come massimo avremmo bisogno di 5 bit per rappresentare il conteggio del ciclo allora perché il professore utilizza 8 bit?

#### *5 -> 8 Bit per rappresentare il conteggio del clock*
*0 0 0 1 1 0 0 0*

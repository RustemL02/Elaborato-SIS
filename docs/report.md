# Progetto FSMD

## Descrizione

Si progetti il circuito che controlla un meccanismo chimico il cui scopo è portare una soluzione iniziale a *pH* noto (acida o basica) ad un *pH* di neutralità. Il valore del *pH* viene espresso in valori compresi tra 0 e 14, i valori superiori comportano un errore.

![Sistema](img/Sistema.jpg)

Per *pH* acido si intende un valore strettamente inferiore a 7, mentre per *pH* basico si intende un valore strettamente superiore a 8, tutti i valori compresi tra [7, 8] sono valori di neutralità.

Se la soluzione iniziale è basica viene aperta la valvola della soluzione acida che diminuisce il valore del *pH* di *0.25* ad ogni ciclo di clock, mentre se è acida viene aperta la valvola della soluzione basica che aumenta il valore del *pH* di *0.50* ad ogni ciclo di clock.

### Interfaccia del circuito

Ingressi:

- `RST`: comunica al circuito di tornare allo stato iniziale indipendentemente dal valore degli altri ingressi.

- `START`: indica al circuito di leggere il *pH* in ingresso **in un unico ciclo di clock**.

- `PH [8]`: rappresenta il valore del *pH* iniziale della soluzione.

Uscite:

- `FINE_OPERAZIONE`: comunica che la soluzione ha finalmente raggiunto la neutralità.

- `ERRORE_SENSORE`: indica che il sistema ha ricevuto in ingresso un *pH* non valido.

- `VALVOLA_ACIDO`: comunica che il *pH* è basico perciò deve essere acidificato.

- `VALVOLA_BASICO`: comunica che il *pH* è acido perciò deve essere alcalinizzato.

- `PH_FINALE [8]`: rappresenta il valore esatto del *pH* quando il sistema ha terminato.

- `NCLK [8]`: rappresenta il numero di cicli impiegati per raggiungere la neutralità.

#### Codifiche

I byte rappresentanti `PH` e `PH_FINALE` sono espressi in codifica a virgola fissa con 4 bit dedicati alla parte intera; mentre il byte `NCLK` viene espresso in modulo.

## Architettura generale del circuito

Il sistema implementa il modello ***FSMD***, cioè collega una macchina a stati finiti (**FSM**) con un'unità di elaborazione (**DATA-PATH**).

<!-- Immagine da sistmare i collegamenti tra FSM e DATA-PATH -->

### Segnali di comunicazione

Il compito della macchina a stati è quello di guidare l'elaboratore verso operazioni contestuali, mentre quest'ultimo fornisce risultati utili a determinare in che stato evolve il sistema.

Il collegamento tra i due sottosistemi avviene grazie allo scambio di:

- segnali di stato, emessi dalla macchina a stati;
- segnali di controllo, emessi dall'elaboratore.

#### Segnali di stato

- `RESET`: la macchina a stati torna allo stato iniziale.
- `INIZIO_OPERAZIONE`: la macchina a stati avvia l'elaborazione.

- `TIPO_PH`:
  - `0` se acido.
  - `1` se basico.

- `STOP_OPERAZIONE`: il *pH* non deve essere modificato.

#### Segnali di controllo

- `ERRORE`: la codifica del *pH* non è valida.
- `NEUTRO`: determina se il *pH* ha raggiunto la neutralità.

## Macchina a stati finiti (FSM)

<!-- Stati della FSM:

- `Reset`, stato iniziale del circuito
- `Errore`, stato raggiunto in caso di *pH* invalido
- `Acido`, stato raggiunto in caso di *pH* acido
- `Basico`, stato raggiunto in caso di *pH* basico
- `Neutro`, stato raggiunto dopo che il *pH* ha raggiunto la neutralità 

## Elaboratore (DATA-PATH)

Il DATA-PATH è strutturato in 2 parti:

1. Contatore: effetua il conteggio dei cicli di clock che ci vogliono per completare l'operazione;
1. Elaboratore: porta il *pH* a un livello di neutralità oppure stampa l'errore se la codifica inserita non soddisfa i requisiti.

<!-- Inserisci Datapath -D->

## Statistiche del circuito

Quando si prova il circuito vengono stampati dei warning con su scritto *"does not fanot"* sono le uscite dei componenti interni che non vengono portate in output quindi possono essere ingorati, essi spariranno dopo l'ottimizzazione della ***FSMD***.

Le statistiche del circuito prima dell'ottimizzazione per area sono:
<!-- SCREEN STATISTICHE -S->

Per minimizzare la **FSM** i comandi da eseguire sono:

```sis
state_minimize stamina
state_assign jedi
source script.rugged
source script.rugged
source script.rugged
```

## Numero di gate e ritardo

Il numero di gate del circuito è <!-- NUMERO GATE-D->.

## La descrizione delle scelte progettuali

Durante l'implementazione del progetto abbiamo fatto le seguenti scelte progettuali:

1. Per controllare se il *pH* è acido oppure basico sfruttiamo il bit più significativo se esso è a 0 allora è acido se è a 1 allora è basico, però questo comprenderebbe che anche i valori neutri vengono assegnati a uno dei due tipi. Per risolvere questo problema abbiamo messo un controllore di neutralità nel DATA-PATH in modo tale che il DATA-PATH comunichi alla FSM di cambiare stato da ***Acido*** oppure ***Basico*** a ***Neutro***.

1. Per controllare l'errore abbiamo aggiunto un componente al DATA-PATH che restituisce uno se e solo se è presente un errore (pH > 14) in questo modo la FSM cambia stato da ***Reset*** a ***Errore***.

1. Se l'utente dallo stato di ***Errore*** oppure ***Neutro*** non inserisce **RST** a *1* la FSM rimane sullo stato in cui si trova.

1. Per semplificare la scrittura e la lettura dei componenti in formato `blif` abbiamo suddiviso il DATA-PATH in più pezzi (`error.blif`, `modifier.blif`, `neutral.blif`, `counter.blif`) che poi abbiamo unito utilizzando i `subckt` e i `search`.

-->
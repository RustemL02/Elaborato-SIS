## Statistiche del circuito

## Numero di gate e ritardo

Il numero di gate del circuito è <!-- NUMERO GATE-D->.

## La descrizione delle scelte progettuali

Durante l'implementazione del progetto abbiamo fatto le seguenti scelte progettuali:

1. Per controllare se il *pH* è acido oppure basico sfruttiamo il bit più significativo se esso è a 0 allora è acido se è a 1 allora è basico, però questo comprenderebbe che anche i valori neutri vengono assegnati a uno dei due tipi. Per risolvere questo problema abbiamo messo un controllore di neutralità nel DATA-PATH in modo tale che il DATA-PATH comunichi alla FSM di cambiare stato da ***Acido*** oppure ***Basico*** a ***Neutro***.

1. Per controllare l'errore abbiamo aggiunto un componente al DATA-PATH che restituisce uno se e solo se è presente un errore (pH > 14) in questo modo la FSM cambia stato da ***Reset*** a ***Errore***.

1. Se l'utente dallo stato di ***Errore*** oppure ***Neutro*** non inserisce **RST** a *1* la FSM rimane sullo stato in cui si trova.

1. Per semplificare la scrittura e la lettura dei componenti in formato `blif` abbiamo suddiviso il DATA-PATH in più pezzi (`error.blif`, `modifier.blif`, `neutral.blif`, `counter.blif`) che poi abbiamo unito utilizzando i `subckt` e i `search`.

1. Abbiamo aggiunto un registro per TIPO_PH essendo che senza di esso si andrebbe a creare un ciclo.

-->

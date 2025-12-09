# System Rezerwacji Sal - Projekt ZI 2025

Kompleksowa aplikacja webowa do zarządzania salami i rezerwacjami. System umożliwia użytkownikom przeglądanie budynków i sal, sprawdzanie dostępności terminów w czasie rzeczywistym oraz dokonywanie rezerwacji.

## Spis Treści
1.  [Technologie](#technologie)
2.  [Wymagania Wstępne](#wymagania-wstępne)
3.  [Konfiguracja Bazy Danych (MongoDB Atlas)](#konfiguracja-bazy-danych-mongodb-atlas)
4.  [Konfiguracja Zmiennych Środowiskowych](#konfiguracja-zmiennych-środowiskowych)
5.  [Uruchomienie Aplikacji](#uruchomienie-aplikacji)
    *   [Opcja 1: Docker (Szybki Start)](#opcja-1-docker-szybki-start)
    *   [Opcja 2: Instalacja Ręczna](#opcja-2-instalacja-ręczna-nodejs)
6.  [Dokumentacja API](#dokumentacja-api)

---

## Technologie

*   **Backend:** Node.js, Express, MongoDB (Mongoose), TypeScript, JWT, Swagger.
*   **Frontend:** React, TypeScript, Vite, Tailwind CSS, Lucide Icons.
*   **DevOps:** Docker, Docker Compose.

---

## Wymagania Wstępne

*   **Konto MongoDB Atlas:** Do przechowywania danych w chmurze.
*   **Docker Desktop** (Opcjonalnie, zalecane dla Opcji 1).
*   **Node.js v16+** (Wymagane tylko dla Opcji 2).

---

## Konfiguracja Bazy Danych (MongoDB Atlas)

Ponieważ aplikacja korzysta z bazy danych w chmurze, należy wykonać wstępną konfigurację:

1.  **Utwórz konto** na stronie [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
2.  **Stwórz nowy klaster** (wybierz opcję **Free/Shared** - jest darmowa).
3.  **Skonfiguruj Użytkownika Bazy Danych:**
    *   W zakładce *Database Access* dodaj nowego użytkownika.
    *   Wybierz metodę *Password*. Zapamiętaj **Username** i **Password**.
    *   Nadaj uprawnienia *Read and write to any database*.
4.  **Skonfiguruj Dostęp Sieciowy:**
    *   W zakładce *Network Access* dodaj adres IP.
    *   Wybierz *Allow Access from Anywhere* (`0.0.0.0/0`), aby umożliwić połączenie z dowolnego miejsca (lub tylko swój IP dla bezpieczeństwa).
5.  **Pobierz Connection String:**
    *   W zakładce *Database* kliknij **Connect**.
    *   Wybierz **Drivers**.
    *   Skopiuj podany ciąg znaków (będzie wyglądał mniej więcej tak: `mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority`).
    *   **Ważne:** Zamień `<password>` na swoje hasło użytkownika bazy danych!

---

## Konfiguracja Zmiennych Środowiskowych

Niezależnie od wybranej metody uruchomienia, musisz skonfigurować plik ze zmiennymi.

1.  W głównym katalogu projektu zduplikuj plik `.env.example` i nazwij go `.env`:
    ```bash
    cp .env.example .env
    # Na Windows po prostu skopiuj plik i zmień nazwę
    ```
2.  Edytuj plik `.env` i uzupełnij `MONGODB_URI` swoim ciągiem połączenia uzyskanym w poprzednim kroku:

    ```env
    PORT=3000
    # Wklej tutaj swój link z MongoDB Atlas (pamiętaj o podaniu hasła w linku!)
    MONGODB_URI=mongodb+srv://uzytkownik:TwojeHaslo@cluster.mongodb.net/zi_project
    JWT_SECRET=twoj_sekretny_klucz_do_podpisywania_tokenow
    VITE_API_BASE_URL=http://localhost:3000
    ```

---

## Uruchomienie Aplikacji

Możesz wybrać jedną z dwóch metod uruchomienia.

### Opcja 1: Docker (Szybki Start)

Najłatwiejszy sposób. Wymaga zainstalowanego Docker Desktop.

1.  Otwórz terminal w głównym katalogu projektu (tam gdzie jest `docker-compose.yml`).
2.  Uruchom komendę:
    ```bash
    docker-compose up --build
    ```
3.  Aplikacja zostanie zbudowana i uruchomiona.
    *   **Frontend:** `http://localhost:5173`
    *   **Backend:** `http://localhost:3000`

### Opcja 2: Instalacja Ręczna (Node.js)

Jeśli nie chcesz używać Dockera, możesz uruchomić serwery ręcznie.

#### Krok A: Backend
1.  Otwórz terminal i przejdź do folderu `Backend`:
    ```bash
    cd Backend
    ```
2.  Zainstaluj zależności:
    ```bash
    npm install
    ```
3.  Uruchom serwer w trybie developerskim:
    ```bash
    npm run dev
    ```
    Serwer wystartuje na porcie 3000.

#### Krok B: Frontend
1.  Otwórz **nowy** terminal i przejdź do folderu `Frontend`:
    ```bash
    cd Frontend
    ```
2.  Zainstaluj zależności:
    ```bash
    npm install
    ```
3.  Uruchom aplikację:
    ```bash
    npm run dev
    ```
4.  Otwórz przeglądarkę pod adresem `http://localhost:5173`.

---

## Dokumentacja API

Po uruchomieniu backendu, interaktywna dokumentacja wszystkich endpointów (Swagger UI) jest dostępna pod adresem:

`http://localhost:3000/api/docs`

Możesz tam testować zapytania, sprawdzać wymagane parametry i struktury odpowiedzi.


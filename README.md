### Zadanie 1 Docker

✅ 3.0 Obraz ubuntu z Pythonem w wersji 3.10 [Link do commita 1](https://github.com/02franek/ebiznes/commit/c90cd290dbc6116a7fe9712e02990d5c9e15ad56)

✅ 3.5 Obraz ubuntu:24.04 z Javą w wersji 8 oraz Kotlinem [Link do commita 2](https://github.com/02franek/ebiznes/commit/1b5bb4a2f20f9404010b859cbedda7b8d6373ae9)

✅ 4.0 Dodanie Gradle'a oraz paczki JDBC SQLite w ramach projektu na Gradle [Link do commita 3](https://github.com/02franek/ebiznes/commit/e20910540fb480b2a90d00ad5c242ed98a366f91)

✅ 4.5 Stworzenie i uruchomienie przykładowej aplikacji przez CMD i gradle [Link do commita 4](https://github.com/02franek/ebiznes/commit/09ffc766673333ca2de67bed81fb3193a62cdd35)

✅ 5.0 Dodanie docker-compose [Link do commita 5](https://github.com/02franek/ebiznes/commit/671a5903a778bac67b5dc2cad37d087b38b81d5a)
###
Obraz na Docker Hub: [franciszektrela/ebiznes-zadanie1](https://hub.docker.com/r/franciszektrela/ebiznes-zadanie1)

Kod: [Link do zadania 1](https://github.com/02franek/ebiznes/tree/main/zadanie_1)
##

### Zadanie 2 Scala Play

✅ 3.0 Stworzenie kontrolera do Produktów [Link do commita 1](https://github.com/02franek/ebiznes/commit/ef3c1226ef887f02ba243c301581896f6ead32c2)

✅ 3.5 Stworzenie endpointów CRUD do kontrolera [Link do commita 2](https://github.com/02franek/ebiznes/commit/e0c6fba681b5dc018d93358aa923e8a4bf0866b5)

✅ 4.0 Stworzenie kontrolerów i endpointów dla Kategorii i Koszyka [Link do commita 3](https://github.com/02franek/ebiznes/commit/dffa84899dd4fb4c17fb839d24febe589d496ed4)

✅ 4.5 Uruchamianie aplikacji przez dockera i udostępnianie na zewnątrz przez ngrok [Link do commita 4](https://github.com/02franek/ebiznes/commit/a35065a93a27c85cf7eedf66c7b46202d43ea0ce)

✅ 5.0 Dodanie konfiguracji CORS dla dwóch hostów i metod CRUD [Link do commita 5](https://github.com/02franek/ebiznes/commit/202164e357504fcadd59d37f8de4f34ca2a48d20)
###
Kod: [Link do zadania 2](https://github.com/02franek/ebiznes/tree/main/zadanie_2/ebiznes-scala)
##

### Zadanie 3 Kotlin Ktor

✅ 3.0 Należy stworzyć aplikację kliencką w Kotlinie we frameworku Ktor, która pozwala na przesyłanie wiadomości na platformę Discord [Link do commita 1](https://github.com/02franek/ebiznes/commit/955f14eca37f2fa5efa4a155eefbb6fded842141)

✅ 3.5 Aplikacja jest w stanie odbierać wiadomości użytkowników z platformy Discord skierowane do aplikacji (bota) [Link do commita 2](https://github.com/02franek/ebiznes/commit/2a97b7666227ce1bb59d91ac6e8e26bac63af87f)

✅ 4.0 Zwróci listę kategorii na określone żądanie użytkownika [Link do commita 3](https://github.com/02franek/ebiznes/commit/ef6bda31bb61b5d4af91de552ce83646707513ee)

✅ 4.5 Zwróci listę produktów wg żądanej kategorii [Link do commita 4](https://github.com/02franek/ebiznes/commit/8af3b2d30f6a1ebaa63f200884c3dc449b64578e)

❌ 5.0 Aplikacja obsłuży dodatkowo jedną z platform: Slack lub Messenger
###
Kod: [Link do zadania 3](https://github.com/02franek/ebiznes/tree/main/zadanie_3)
##

### Zadanie 4 Echo Go

✅ 3.0 Należy stworzyć aplikację we frameworki echo w j. Go, która będzie miała kontroler Produktów zgodny z CRUD [Link do commita 1](https://github.com/02franek/ebiznes/commit/280597549d39c1d8b96de6d531291a70c017e426)

✅ 3.5 Należy stworzyć model Produktów wykorzystując gorm oraz wykorzystać model do obsługi produktów (CRUD) w kontrolerze (zamiast listy) [Link do commita 2](https://github.com/02franek/ebiznes/commit/ced3a738ac650a29af102b20d4660c73be754ff1)

✅ 4.0 Należy dodać model Koszyka oraz dodać odpowiedni endpoint [Link do commita 3](https://github.com/02franek/ebiznes/commit/8ca63bb5e4b2ce348f4f404bc9ae342c069ac315)

✅ 4.5 Należy stworzyć model kategorii i dodać relację między kategorią, a produktem [Link do commita 4](https://github.com/02franek/ebiznes/commit/151f21f93d613e0178fdd6acd750aa8f6a0c67cf)

✅ 5.0 Należy pogrupować zapytania w gorm’owe scope'y [Link do commita 5](https://github.com/02franek/ebiznes/commit/207e2739ed77909959848837417dc3c5ef9bc624)
###
Kod: [Link do zadania 4](https://github.com/02franek/ebiznes/tree/main/zadanie_4/zadanie-echo)
##

### Zadanie 5 Frontend (React+Go)

✅ 3.0 W ramach projektu należy stworzyć dwa komponenty: Produkty orazPłatności; Płatności powinny wysyłać do aplikacji serwerowej dane, a w Produktach powinniśmy pobierać dane o produktach z aplikacji serwerowej [Link do commita 1](https://github.com/02franek/ebiznes/commit/dd269cec391943b0330fbfa0e59cd05a51bfbe59)

✅ 3.5 Należy dodać Koszyk wraz z widokiem, należy wykorzystać routing [Link do commita 2](https://github.com/02franek/ebiznes/commit/726bfc6b4056ee45553ad2cee3155337fb0f1298)

✅ 4.0 Dane pomiędzy wszystkimi komponentami powinny być przesyłane za pomocą React hooks [Link do commita 3](https://github.com/02franek/ebiznes/commit/997182adc9ddc2ef4044e33c785e82ff0ab28e90)

✅ 4.5 Należy dodać skrypt uruchamiający aplikację serwerową oraz kliencką na dockerze via docker-compose [Link do commita 4](https://github.com/02franek/ebiznes/commit/30fa5598b78acd90a41c3acf0c8790eae09dda97)

✅ 5.0 Należy wykorzystać axios’a oraz dodać nagłówki pod CORS [Link do commita 5](https://github.com/02franek/ebiznes/commit/30fa5598b78acd90a41c3acf0c8790eae09dda97)
###
Kod: [Link do zadania 5](https://github.com/02franek/ebiznes/tree/main/zadanie_5)
##

### Zadanie 6 Testy (do Zadania 5)

✅ 3.0 Należy stworzyć 20 przypadków testowych w CypressJS lub Selenium [Link do commita 1](https://github.com/02franek/ebiznes/commit/0d1f75f1e891540e82a6ce0a47e892fcc885a0f8)

✅ 3.5 Należy rozszerzyć testy funkcjonalne, aby zawierały minimum 50 asercji [Link do commita 2](https://github.com/02franek/ebiznes/commit/0d1f75f1e891540e82a6ce0a47e892fcc885a0f8)

✅ 4.0 Należy stworzyć testy jednostkowe do wybranego wcześniejszego projektu z minimum 50 asercjami [Link do commita 3](https://github.com/02franek/ebiznes/commit/c5a5703d9b5036b8e60f9c3187ad1f111731434f)

✅ 4.5 Należy dodać testy API, należy pokryć wszystkie endpointy z minimum jednym scenariuszem negatywnym per endpoint [Link do commita 4](https://github.com/02franek/ebiznes/commit/26117c4a8d93a69f81dbb7f4ea1617c5d6a92f4a)

❌ 5.0 Należy uruchomić testy funkcjonalne na Browserstacku
###
Kod: [Link do zadania 5](https://github.com/02franek/ebiznes/tree/main/zadanie_5)
##

### Zadanie 7 Analiza statyczna (do Zadania 5)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=02franek_ebiznes&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=02franek_ebiznes)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=02franek_ebiznes&metric=bugs)](https://sonarcloud.io/summary/new_code?id=02franek_ebiznes)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=02franek_ebiznes&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=02franek_ebiznes)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=02franek_ebiznes&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=02franek_ebiznes)

✅ 3.0 Należy dodać litera do odpowiedniego kodu aplikacji serwerowej w hookach gita [Link do commita 1](https://github.com/02franek/ebiznes/commit/3184b08a266503f7321dc52e5db3b8c8e77bca12)

✅ 3.5 Należy wyeliminować wszystkie bugi w kodzie w Sonarze (kod aplikacji serwerowej) [Link do commita 2](https://github.com/02franek/ebiznes/commit/2c258754b6875778478244f3466adbc8b43ce989)

✅ 4.0 Należy wyeliminować wszystkie zapaszki w kodzie w Sonarze (kod aplikacji serwerowej) [Link do commita 3](https://github.com/02franek/ebiznes/commit/2c258754b6875778478244f3466adbc8b43ce989)

✅ 4.5 Należy wyeliminować wszystkie podatności oraz błędy bezpieczeństwa w kodzie w Sonarze (kod aplikacji serwerowej) [Link do commita 4](https://github.com/02franek/ebiznes/commit/76b1c9a407f255afd82f42f891040c4a531377d9)

✅ 5.0 Należy wyeliminować wszystkie błędy oraz zapaszki w kodzie aplikacji klienckiej [Link do commita 5](https://github.com/02franek/ebiznes/commit/2c175873bae3c3a2cc590596d447e97c2ae1db2a)
###
Kod: [Link do zadania 5](https://github.com/02franek/ebiznes/tree/main/zadanie_5)
##

### Zadanie 8 Klient OAuth2

✅ 3.0 Zaimplementować logowanie przez aplikację serwerową (bez Oauth2) [Link do commita 1](https://github.com/02franek/ebiznes/commit/ea0f7ef8d5636edfe39453cd352deefd5eff96a1)

✅ 3.5 Zaimplementować rejestrację przez aplikację serwerową (bez Oauth2) [Link do commita 2](https://github.com/02franek/ebiznes/commit/d7da6ed671f04cd3a3cc74efff1a6a9c76bf622d)

✅ 4.0 Zaimplementować logowanie via Google OAuth2 [Link do commita 3](https://github.com/02franek/ebiznes/commit/cd3afd630c0a1358f77c30a0da1684ca157c8984)

✅ 4.5 Zaimplementować logowanie via Facebook lub Github OAuth2 [Link do commita 4](https://github.com/02franek/ebiznes/commit/ff8259a032deb985aff953e3915d7af05d75d4ef)

✅ 5.0 Zaimplementować zapisywanie danych logowania OAuth2 po stronie serwera [Link do commita 5](https://github.com/02franek/ebiznes/commit/1dfea3bdf964a54592efc6bfa7b123aa16e4b004)
###
Kod: [Link do zadania 8](https://github.com/02franek/ebiznes/tree/main/zadanie_8)
##

### Zadanie 9 Integracja LLM z botem Discordowym (z Zadania 3)

✅ 3.0 Należy stworzyć po stronie serwerowej osobny serwis do łącznia z chatGPT [Link do commita 1](https://github.com/02franek/ebiznes/commit/42d9f8111d28fde0c72836eaa79a698516cdcbfe)

✅ 3.5 Należy połączyć serwis z interfejsem frontendowym via serwis w Kotlinie (zadanie 3) - discord + JS [Link do commita 2](https://github.com/02franek/ebiznes/commit/b103618086b095531c693d4980f11ab629ca0f54) [Link do commita 3](https://github.com/02franek/ebiznes/commit/00c25915dd8d1c9250155561717aa2f07cfb1901)

✅ 4.0 Należy stworzyć listę 5 różnych otwarć oraz zamknięć rozmowy [Link do commita 4](https://github.com/02franek/ebiznes/commit/29ab06e3a773c8393c523a041db79e1c0882c833)

✅ 4.5 Zaimplementować filtrowanie po zagadnieniach związanych ze sklepem (np. ograniczenie się jedynie do ubrań oraz samego sklepu) do GPT [Link do commita 5](https://github.com/02franek/ebiznes/commit/d35a420ce1a26fe8c50c991632eb7e734a65364f)

✅ 5.0 Zaimplementować filtrowanie odpowiedzi po sentymencie [Link do commita 6](https://github.com/02franek/ebiznes/commit/d4d4db35105544b19d3ea081d5b3675490e61729)
###
Kod: [Link do zadania 9](https://github.com/02franek/ebiznes/tree/main/zadanie_9/gpt_service)
##

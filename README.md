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

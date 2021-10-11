class Fahrenheit:
    def get_fahrenheit_temperature(self) -> float:
        return 32


class Celsius:
    def get_celsius_temperature(self) -> float:
        return 32


class CelsiusToFahrenheitAdapter(Celsius, Fahrenheit):
    def convert(self) -> str:
        return f"Adapter: (CELSIUS TRANSLATED TO FAHRENHEIT) {self.celsius_to_fahrenheit(self.get_celsius_temperature())}"

    def celsius_to_fahrenheit(self, celsius_temp: float) -> float:
        return (celsius_temp * 9 / 5) + 32


def client_code(fahrenheit: "Fahrenheit") -> None:
    print(fahrenheit.get_fahrenheit_temperature(), end="")


if __name__ == "__main__":
    print("Client: 0 degrees celsius is 32 fahrenheits:")
    fahrenheit = Fahrenheit()
    client_code(fahrenheit)
    print("\n")

    celsius = Celsius()
    print("Client: The temperature given is in Celsius and we need it in Fahrenheit :")
    print(f"Celsius: {celsius.get_celsius_temperature()}", end="\n\n")

    print("Client: Adapter converts the celsius to Fahrenheit:")
    adapter = CelsiusToFahrenheitAdapter()
    print(adapter.convert())

export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
};

export const CODE_SNIPPETS = {
  javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
  typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
  python: `\ndef sum_even_numbers(numbers):
\t\"\"\"
\tReturns the sum of all even numbers in the given list.

\t:param numbers: List of integers
\t:return: Sum of even integers
\t\"\"\"
\ttotal = 0
\tfor number in numbers:
\t\tif number % 2 == 0:
\t\t\ttotal += number
\treturn total

numbers = [1, 2, 3, 4, 5, 6]
sum_of_evens = sum_even_numbers(numbers)
print("\\n\\tSum of even numbers: {}\\n".format(sum_of_evens))\n`,
  java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
  csharp:
    'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
  php: "<?php\n\n$name = 'Alex';\necho $name;\n",
};

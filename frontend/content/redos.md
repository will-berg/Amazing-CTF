# Regular Expression Denial of Service (ReDos)
The Regular expression Denial of Service (ReDoS) is a Denial of Service attack, that exploits the fact that most Regular Expression implementations may reach extreme situations that cause them to work very slowly (exponentially related to input size). An attacker can then cause a program using a Regular Expression (Regex) to enter these extreme situations and then hang for a very long time.

## Examples of Evil Regex
- (a+)+
- ([a-zA-Z]+)*
- (a|aa)+
- (a|a?)+
- (.*a){x} for x \> 10
- /A(B|C+)+D/

All the above are susceptible to the input aaaaaaaaaaaaaaaaaaaaaaaa! (The minimum input length might change slightly, when using faster or slower machines).

## Attacks
The attacker might use the above knowledge to look for applications that use Regular Expressions, containing an Evil Regex, and send a well-crafted input, that will hang the system. Alternatively, if a Regex itself is affected by a user input, the attacker can inject an Evil Regex, and make the system vulnerable.

## Web application attack
1. Open a JavaScript
2. Find Evil Regex
3. Craft a malicious input for the found Regex
4. Submit a valid value via intercepting proxy
5. Change the request to contain a malicious input
6. You are done!
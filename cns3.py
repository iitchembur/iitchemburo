def generate_key(text, key):
    key = list(key.upper())
    if len(text) == len(key):
        return "".join(key)
    else:
        for i in range(len(text) - len(key)):
            key.append(key[i % len(key)])
    return "".join(key)

def encrypt(text, key):
    text = text.upper().replace(" ", "")
    key = generate_key(text, key)
    cipher_text = []
    print("\n--- Encryption Steps ---")
    print(f"Text: {text}")
    print(f"Key : {key}\n")

    for i in range(len(text)):
        t_val = ord(text[i]) - ord('A')
        k_val = ord(key[i]) - ord('A')
        x = (t_val + k_val) % 26
        cipher_char = chr(x + ord('A'))

        # step output (no arrows)
        print(f"{text[i]}({t_val}) + {key[i]}({k_val}) = {x} {cipher_char}")

        cipher_text.append(cipher_char)
    return "".join(cipher_text)

def decrypt(cipher_text, key):
    cipher_text = cipher_text.upper().replace(" ", "")
    key = generate_key(cipher_text, key)
    orig_text = []
    print("\n--- Decryption Steps ---")
    print(f"Cipher: {cipher_text}")
    print(f"Key   : {key}\n")

    for i in range(len(cipher_text)):
        c_val = ord(cipher_text[i]) - ord('A')
        k_val = ord(key[i]) - ord('A')
        x = (c_val - k_val + 26) % 26
        orig_char = chr(x + ord('A'))

        # step output (no arrows)
        print(f"{cipher_text[i]}({c_val}) - {key[i]}({k_val}) = {x} {orig_char}")

        orig_text.append(orig_char)
    return "".join(orig_text)

# Main Program
choice = input("Do you want to (E)ncrypt or (D)ecrypt? : ").strip().upper()

if choice == "E":
    message = input("Enter the plain text: ")
    keyword = input("Enter the key: ")
    encrypted = encrypt(message, keyword)
    print("\nEncrypted Text:", encrypted)

elif choice == "D":
    cipher = input("Enter the cipher text: ")
    keyword = input("Enter the key: ")
    decrypted = decrypt(cipher, keyword)
    print("\nDecrypted Text:", decrypted)

else:
    print("Invalid choice! Please enter E or D.")

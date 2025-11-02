import math
def apply_caesar_cipher(text, shift):
    encrypted_text = []
    for char in text:
        if 'A' <= char <= 'Z':
            encrypted_text.append(chr((ord(char) - ord('A') + shift) % 26 + ord('A')))
        elif 'a' <= char <= 'z':
            encrypted_text.append(chr((ord(char) - ord('a') + shift) % 26 + ord('a')))
        else:
            encrypted_text.append(char)  # Non-alphabet characters remain unchanged
    return ''.join(encrypted_text)

def reverse_caesar_cipher(text, shift):
    return apply_caesar_cipher(text, -shift)

def get_column_order_from_keyword(keyword):
    keyword_pairs = list(enumerate(keyword))
    sorted_pairs = sorted(keyword_pairs, key=lambda x: (x[1], x[0]))
    return [original_index for original_index, _ in sorted_pairs]

def encrypt_with_columnar_transposition(text, keyword, padding_char='*'):
    columns = len(keyword)
    rows = math.ceil(len(text) / columns)
    padded_text = text + padding_char * (rows * columns - len(text))  # Pad text if necessary

    # Build the grid row by row
    grid = [list(padded_text[i * columns:(i + 1) * columns]) for i in range(rows)]
    column_order = get_column_order_from_keyword(keyword)

    # Read columns in the order determined by the keyword
    ciphertext = []
    for column_index in column_order:
        for row in range(rows):
            ciphertext.append(grid[row][column_index])
    
    return ''.join(ciphertext), grid, column_order, padded_text

def decrypt_with_columnar_transposition(ciphertext, keyword, padding_char='*'):
    columns = len(keyword)
    rows = math.ceil(len(ciphertext) / columns)
    total_length = rows * columns

    # Pad if the ciphertext is shorter than expected
    if len(ciphertext) != total_length:
        ciphertext += padding_char * (total_length - len(ciphertext))

    column_order = get_column_order_from_keyword(keyword)
    grid = [[''] * columns for _ in range(rows)]

    # Fill the grid with characters from the ciphertext
    index = 0
    for col in column_order:
        for row in range(rows):
            grid[row][col] = ciphertext[index]
            index += 1

    # Reassemble the grid into a single string (including padding)
    padded_text = ''.join(''.join(row) for row in grid)
    return padded_text, grid, column_order

def display_grid(grid, keyword, column_order, step_description):
    print(f"\n{step_description}")
    num_rows = len(grid)
    num_columns = len(grid[0])
    
    # Print column headers and separator line
    header = "    " + "  ".join(f"{i}" for i in range(num_columns))
    print(header)
    print("    " + "---" * num_columns)
    
    # Print each row
    for row in range(num_rows):
        print(f"r{row:02d}| {'  '.join(grid[row])}")
    
    # Print additional information
    print("Keyword:", keyword)
    print("Column order:", column_order)

if __name__ == "__main__":
    # Get user input
    plaintext = input("Enter the plaintext message: ")
    shift_value = int(input("Enter Caesar cipher shift (e.g., 3): "))
    keyword = input("Enter keyword for columnar transposition: ")

    print("\n--- ENCRYPTION PROCESS ---")
    # Step 1: Caesar Cipher
    caesar_encrypted_text = apply_caesar_cipher(plaintext, shift_value)
    print("Text after Caesar cipher substitution:", caesar_encrypted_text)

    # Step 2: Columnar Transposition
    final_ciphertext, transposition_grid, column_order, padded_text = encrypt_with_columnar_transposition(caesar_encrypted_text, keyword)
    display_grid(transposition_grid, keyword, column_order, "Columnar Transposition Grid (Encryption)")
    print("Final ciphertext (Product Cipher result):", final_ciphertext)

    print("\n--- DECRYPTION PROCESS ---")
    # Step A: Reverse Columnar Transposition
    decrypted_padded_text, decrypt_grid, decrypt_column_order = decrypt_with_columnar_transposition(final_ciphertext, keyword)
    decrypted_text = decrypted_padded_text.rstrip('*')  # Remove padding
    display_grid(decrypt_grid, keyword, decrypt_column_order, "Columnar Transposition Grid (Decryption)")
    print("Recovered text after Columnar Transposition decryption:", decrypted_text)

    # Step B: Reverse Caesar Cipher
    recovered_plaintext = reverse_caesar_cipher(decrypted_text, shift_value)
    print("Recovered original plaintext after Caesar decryption:", recovered_plaintext)

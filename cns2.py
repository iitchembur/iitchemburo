def prepare_key(key):
    key = key.upper().replace("J", "I")
    seen = set()
    key_square = []

    for char in key:
        if char.isalpha() and char not in seen:
            seen.add(char)
            key_square.append(char)

    for char in "ABCDEFGHIKLMNOPQRSTUVWXYZ":  # no J
        if char not in seen:
            seen.add(char)
            key_square.append(char)

    return [key_square[i:i+5] for i in range(0, 25, 5)]

def find_position(letter, key_matrix):
    for r, row in enumerate(key_matrix):
        if letter in row:
            return r, row.index(letter)
    raise ValueError(f"Letter {letter!r} not found in key matrix.")

def prepare_text(text):
    text = text.upper().replace("J", "I")
    text = ''.join(ch for ch in text if ch.isalpha())

    i = 0
    out = []
    while i < len(text):
        a = text[i]
        if i + 1 < len(text):
            b = text[i+1]
            if a == b:
                out.append(a + 'X')
                i += 1
            else:
                out.append(a + b)
                i += 2
        else:
            out.append(a + 'X')
            i += 1
    return ''.join(out)

def chunk_pairs(s):
    return [s[i:i+2] for i in range(0, len(s), 2)]

def encrypt_pair(a, b, K):
    r1, c1 = find_position(a, K)
    r2, c2 = find_position(b, K)

    if r1 == r2:  # same row
        ea = K[r1][(c1 + 1) % 5]
        eb = K[r2][(c2 + 1) % 5]
        rule = "same row, shift right"
    elif c1 == c2:  # same column
        ea = K[(r1 + 1) % 5][c1]
        eb = K[(r2 + 1) % 5][c2]
        rule = "same column, shift down"
    else:  # rectangle
        ea = K[r1][c2]
        eb = K[r2][c1]
        rule = "rectangle, swap columns"
    return ea + eb, rule, (r1, c1, r2, c2)

def decrypt_pair(a, b, K):
    r1, c1 = find_position(a, K)
    r2, c2 = find_position(b, K)

    if r1 == r2:  # same row
        da = K[r1][(c1 - 1) % 5]
        db = K[r2][(c2 - 1) % 5]
        rule = "same row, shift left"
    elif c1 == c2:  # same column
        da = K[(r1 - 1) % 5][c1]
        db = K[(r2 - 1) % 5][c2]
        rule = "same column, shift up"
    else:  # rectangle
        da = K[r1][c2]
        db = K[r2][c1]
        rule = "rectangle, swap columns"
    return da + db, rule, (r1, c1, r2, c2)

def encrypt_message(plaintext, K):
    prepared = prepare_text(plaintext)
    digraphs = chunk_pairs(prepared)

    print("\nPrepared digraphs:")
    print(' '.join(digraphs))
    print("\nEncryption steps:")

    ct = []
    for pair in digraphs:
        enc, rule, (r1, c1, r2, c2) = encrypt_pair(pair[0], pair[1], K)
        ct.append(enc)
        print(f"{pair}  ({r1+1},{c1+1}) ({r2+1},{c2+1})   {rule}   {enc}")
    return ''.join(ct)

def decrypt_message(ciphertext, K):
    text = ''.join(ch for ch in ciphertext.upper() if ch.isalpha()).replace("J", "I")
    digraphs = chunk_pairs(text)

    print("\nCipher digraphs:")
    print(' '.join(digraphs))
    print("\nDecryption steps:")

    pt = []
    for pair in digraphs:
        dec, rule, (r1, c1, r2, c2) = decrypt_pair(pair[0], pair[1], K)
        pt.append(dec)
        print(f"{pair}  ({r1+1},{c1+1}) ({r2+1},{c2+1})   {rule}   {dec}")

    raw = ''.join(pt)

    # clean padding
    result = []
    i = 0
    while i < len(raw):
        if i < len(raw)-2 and raw[i] == raw[i+2] and raw[i+1] == 'X':
            result.append(raw[i])
            i += 2  # skip the 'X'
        else:
            result.append(raw[i])
        i += 1
    if result and result[-1] == 'X':
        result.pop()
    return ''.join(result)

def print_key_matrix(K):
    print("\nKey Matrix:")
    for row in K:
        print(' '.join(row))

if __name__ == "__main__":
    key = input("Enter the key: ")
    plaintext = input("Enter the plaintext message: ")

    K = prepare_key(key)
    print_key_matrix(K)

    ciphertext = encrypt_message(plaintext, K)
    print("\nEncrypted message:", ciphertext)

    decrypted = decrypt_message(ciphertext, K)
    print("\nDecrypted message:", decrypted)

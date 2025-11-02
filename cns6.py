import random
from dataclasses import dataclass

# === Helper Functions ===
def int_from_bytes(b: bytes) -> int:
    return int.from_bytes(b, byteorder='big')

def int_to_bytes(x: int) -> bytes:
    return x.to_bytes((x.bit_length() + 7) // 8, byteorder='big')

def is_probable_prime(n: int, k: int = 20) -> bool:
    """Miller-Rabin primality test"""
    if n < 2:
        return False
    small_primes = [2,3,5,7,11,13,17,19,23,29,31,37]
    for p in small_primes:
        if n % p == 0:
            return n == p

    # Write n-1 as d*2^s
    d, s = n - 1, 0
    while d % 2 == 0:
        d //= 2
        s += 1

    for _ in range(k):
        a = random.randrange(2, n - 1)
        x = pow(a, d, n)
        if x in (1, n - 1):
            continue
        for _ in range(s - 1):
            x = pow(x, 2, n)
            if x == n - 1:
                break
        else:
            return False
    return True

def generate_prime(bits: int) -> int:
    """Generate a random prime of given bit size"""
    while True:
        candidate = random.getrandbits(bits) | (1 << (bits - 1)) | 1
        if is_probable_prime(candidate):
            return candidate

def egcd(a: int, b: int):
    if b == 0:
        return (a, 1, 0)
    g, x1, y1 = egcd(b, a % b)
    return (g, y1, x1 - (a // b) * y1)

def modinv(a: int, m: int) -> int:
    g, x, _ = egcd(a, m)
    if g != 1:
        raise ValueError("No modular inverse")
    return x % m

# === RSA Key Pair ===
@dataclass
class RSAKeyPair:
    n: int
    e: int
    d: int

def generate_rsa_keypair(bits: int = 512, e: int = 65537) -> RSAKeyPair:
    print("\n=== Generating RSA Keys ===")
    p = generate_prime(bits // 2)
    q = generate_prime(bits // 2)
    n = p * q
    phi = (p - 1) * (q - 1)
    d = modinv(e, phi)
    print(f"Prime p: {p}")
    print(f"Prime q: {q}")
    print(f"Modulus (n): {n}")
    print(f"Totient (φ): {phi}")
    print(f"Public Exponent (e): {e}")
    print(f"Private Exponent (d): {d}\n")
    return RSAKeyPair(n, e, d)

# === RSA Encrypt/Decrypt ===
def encrypt(message: str, pubkey: RSAKeyPair) -> int:
    m = int_from_bytes(message.encode())
    if m >= pubkey.n:
        raise ValueError("Message too large for key size!")
    return pow(m, pubkey.e, pubkey.n)

def decrypt(cipher: int, privkey: RSAKeyPair) -> str:
    m = pow(cipher, privkey.d, privkey.n)
    return int_to_bytes(m).decode(errors='ignore')

# === Main Program ===
if __name__ == "__main__":
    print(" RSA Cryptosystem Implementation")
    bits = int(input("Enter key size in bits (e.g., 512, 1024): "))
    keypair = generate_rsa_keypair(bits)

    message = input("Enter a message to encrypt: ")
    cipher = encrypt(message, keypair)
    print(f"\nEncrypted Message: {cipher}")

    decrypted = decrypt(cipher, keypair)
    print(f"Decrypted Message: {decrypted}")

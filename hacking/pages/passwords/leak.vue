<template>
    <div class="flex flex-col items-center">
        <div class="navbar bg-gray-900 text-white flex items-center justify-between p-4 space-x-4">
            <div class="text-xl">
                Passwords Hack Page
            </div>
            <div class="flex gap-5">
                <button class="btn" @click="navigateTo(`/passwords/login`)">Login page</button>
                <TestModal buttonText="Hej" title="hej" />
            </div>
        </div>
        <div class="overflow-x-auto">
            <table class="table">
                <!-- head -->
                <thead>
                    <tr>
                        <th>Usernames</th>
                        <th>Passwords</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in users" :key="index">
                        <td>{{ user.username }}</td>
                        <td>{{ user.password }}</td>
                    </tr>
                </tbody>
            </table>


        </div>
        <div class="form-control w-full max-w-xs">
            <div v-if="shift === 13" class="alert alert-info">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    class="stroke-current shrink-0 w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Fun fact! A Caesar cipher with shift 13 is a special case known as ROT13. Because the English consists
                    of 26 letters, 2 shifts of 13 steps will result in restoring the text.</span>
            </div>
            <label class="label">
                <span class="label-text">Enter encrypted string</span>
            </label>
            <input v-model="cipher" type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
            <select v-model="cipherType" class="select select-bordered w-full max-w-xs">
                <option disabled selected value="">Select a cipher</option>
                <option>Caesar Cipher</option>
                <option>Substitution Cipher</option>
            </select>
            <select v-model="shift" v-if="cipherType === 'Caesar Cipher'" class="select select-bordered w-full max-w-xs">
                <option disabled selected value="">Select shift</option>
                <option :value="num" v-for="num in numArr">{{ num }}</option>
            </select>
            <button @click="decryptCipher">Decipher</button>
            <div>
                <h3>Result:</h3>
                <p v-if="decrypted !== ''">{{ decrypted }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { decrypt } from 'text-encrypter'

type UsrObj = {
    username: string;
    password: string;
}

const cipher = ref<string>('');
const cipherType = ref<string>('');
const shift = ref<number>(0);
const decrypted = ref<string>('');
const numArr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
const users: UsrObj[] = [
    { username: 'Cy Ganderton', password: 'Quality Control Specialist' },
    { username: 'Hart Hagerty', password: 'Desktop Support Technician' },
    { username: 'Brice Swyre', password: 'Tax Accountant' },
    { username: 'Brice Swyre', password: 'Tax Accountant' },
    { username: 'Brice Swyre', password: 'Tax Accountant' },
];
const decryptCipher: () => void = () => {
    decrypted.value = decrypt(cipher.value, shift.value);
    console.log(decrypted.value);
}
</script>
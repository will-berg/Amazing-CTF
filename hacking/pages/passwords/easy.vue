<template>
    <div class="flex flex-col items-center">
        <div class="navbar bg-gray-900 text-white flex items-center justify-between p-4 space-x-4">
            <div class="text-xl">
                Passwords Hack Page - Medium
            </div>
            <div>
                <TestModal buttonText="Hej" title="hej"/>
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
                    <tr>
                        <td>Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                    </tr>
                    <tr>
                        <td>Hart Hagerty</td>
                        <td>Desktop Support Technician</td>
                    </tr>
                    <tr>
                        <td>Brice Swyre</td>
                        <td>Tax Accountant</td>
                    </tr>
                    <tr>

                        <td>Brice Swyre</td>
                        <td>Tax Accountant</td>
                    </tr>
                    <tr>
                        <td>Brice Swyre</td>
                        <td>Tax Accountant</td>
                    </tr>
                </tbody>
            </table>


            <div class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">Enter encrypted string</span>
                </label>
                <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
                <select class="select select-bordered w-full max-w-xs">
                    <option disabled selected>Select a cipher</option>
                    <option>Han Solo</option>
                    <option>Greedo</option>
                </select>

                <button></button>
            </div>

        </div>
    </div>
</template>

<script lang="ts" setup>

</script>
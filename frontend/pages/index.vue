<template>
    <div class="py-10 md:px-14 px-4">
        <div class="grid items-center md:grid-cols-2 grid-cols-1 grid-rows-1">
            <div class="md:row-start-1 md:row-end-2 md:col-start-1 md:col-end-1">
                <h1 id="title">Welcome to AmazingCTF!</h1>
                <h2 class="py-4">
                    The best place to sharpen your practical skills in cybersecurity
                </h2>
                <button class="btn rounded-full btn-primary font-bold" onclick="my_modal.showModal()">
                    get started
                </button>
                <dialog id="my_modal" class="modal">
                    <div class="modal-box">
                        <form method="dialog">
                            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                            </button>
                        </form>
                        <h3 class="font-bold text-lg">Get Started</h3>
                        <p>
                            Welcome to the AmazingCTF website! Learn about cybersecurity and
                            test your skills in a safe environment.
                        </p>
                        <p>Getting started is easy, just follow the steps below:</p>
                        <br />
                        <ol>
                            <li>
                                1.
                                <NuxtLink to="register" class="text-primary hover:underline">Create</NuxtLink>
                                an account.
                            </li>
                            <li>
                                2.
                                <NuxtLink to="login" class="text-primary hover:underline">Login</NuxtLink>
                                to your account.
                            </li>
                            <li>
                                3. Go to the
                                <NuxtLink to="challenges" class="text-primary hover:underline">challenges page</NuxtLink>.
                            </li>
                            <li>
                                4. Select a challenge that seems interesting by clicking
                                "start".
                            </li>
                            <li>5. Solve the challenge to receive a reward.</li>
                            <li>6. Move on to the next challenge!</li>
                        </ol>
                        <br />
                        <p>Good luck!</p>
                    </div>
                </dialog>

                <NuxtLink to="/about" class="btn rounded-full btn-accent mx-2 font-bold">About Us</NuxtLink>
            </div>
            <!-- Animated SVG -->
            <AnimatedHacker />
        </div>
        <!-- Cards -->
        <div class="grid lg:grid-cols-3 md:grid-rows-1 py-16 gap-4">
            <FeatureCard title="Challenges" description="Engage in challenges of varying difficulties to hone your skills."
                icon="game-icons:laptop" />
            <FeatureCard title="Leaderboards"
                description="Ascend the ranks and see how your skills measure up against other hackers."
                icon="ic:twotone-leaderboard" />
            <FeatureCard title="Statistics" description="Keep a close eye on your progress and track your growth."
                icon="wpf:statistics" />
        </div>
    </div>
</template>

<script lang="ts" setup>

useHead({
    title: "Home",
});

</script>

<style></style>

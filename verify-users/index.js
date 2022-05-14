const users = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
];

const verifiers = [
    { id: 1 },
    { id: 2 },
];

const QUEUE_INTERVAL = 2000;
const VERIFY_INTERVAL = 1000;


const verificationQueue = [];
const user = users.shift();
verificationQueue.push(user);
console.log(`User ${user.id} has entered the queue.`);

const queueInterval = setInterval(() => {
    const user = users.shift();
    if (user) {
        verificationQueue.push(user);
        console.log(`User ${user.id} has entered the queue.`);
    }
    else {
        clearInterval(queueInterval);
    }
}, QUEUE_INTERVAL);

const verifyInterval = setInterval(async () => {
    if (verificationQueue.length && verifiers.length) {
        const user = verificationQueue.shift();
        const verifier = verifiers.shift();
        await verifyUser(user);
        verifiers.push(verifier);
        console.log(`User ${user.id} has been verified by verifier ${verifier.id}`);
        if (users.length === 0 && verificationQueue.length === 0 && verifiers.length === 2) {
            console.log("All users have been verified.");
            clearInterval(verifyInterval);
            process.exit(0);
        }
    }
}, VERIFY_INTERVAL);

function verifyUser(user) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(user);
        }, 4000);
    });
}
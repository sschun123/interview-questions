# Verify Users

An identify verification service will load users into a queue every 2 seconds. A set number of verifiers will be on standby to pick users off the queue to verify the user's identify. The verifier takes 4 seconds to run until the verifier can be free again to pick the next user in the queue.

Given a list of users and verifiers, write a program that will load users into the queue every 2 seconds and if a verifier is available then have it pick any available users off the queue and verify the user for 4 seconds before the verifier is available again.

When a user enters the queue log the message, "User :user_id has entered the queue."
When a user has been verified log the message, "User :user_id has been verified by verifier :verifier_id."
Once the final user has been verified log the message, "All users have been verified." and exit the program.
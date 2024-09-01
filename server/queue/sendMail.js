import { Queue, Worker } from 'bullmq';
import { defaultQueueConfig, redisConnection } from '../config/queue.js'
import asyncErrorHandler from '../utils/asyncErrorHandler.js'
import { sendMail } from '../config/mailer.js';

export const emailQueueName = 'send-email'

export const emailQueue = new Queue(emailQueueName, {
    connection: redisConnection,
    defaultJobOptions: defaultQueueConfig
});


// export const sendEmail = asyncErrorHandler(async (req, res, next) => {
//     const { email } = req.query

//     if (!email) {
//         return next(new ErrorHandler("Email not found", 404))
//     }

    // const payload = [
    //     {
    //         toEmail: email,
    //         subject: "Test Email",
    //         body: "<h1> Hello World </h1>",
    //         body1: "<h1> Helloworld2 </h1>",
    //     },
    //     {
    //         toEmail: email,
    //         subject: "You got an amazing day",
    //         body: "<h1> Hello World from job </h1>",

    //     }
    // ]

    // await emailQueue.add(emailQueueName, payload);

//     return res.status(200).json({ message: "Job added successfully." })

// })


export const handler = new Worker(emailQueueName, async (job) => {
    try {

        const {payload} = req.job;

        // send 1st Mail
        await sendMail(payload.toEmail, payload.subject, payload.body);
        // sending 2nd mail
        // await sendMail(payload.toEmail, "Second Email", payload.body1);

    } catch (error) {
        console.error("Worker error:", error);
        throw error;
    }
}, { connection: redisConnection });




handler.on("completed", (job) => {
    console.log("Email work completed", job.id);
})

handler.on("failed", (job) => {
    console.log("Email work failed", job.id);
})

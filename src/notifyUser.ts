const userFeedbackElement = document.getElementById(
    "userFeedback"
) as HTMLParagraphElement;

export function notifyUser(message: string, duration?: number) {
    userFeedbackElement.innerHTML = message;
    if (duration) {
        setTimeout(() => {
            userFeedbackElement.innerHTML = "--";
        }, duration);
    }
}

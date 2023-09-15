//check password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter
export const passwordFormating = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

// check email
export const emailFormating = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
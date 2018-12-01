export class AppUtil {
    static convertDate(date) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let d = new Date(date);
        return days[d.getDay()] + " " + monthNames[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear();
    }
}

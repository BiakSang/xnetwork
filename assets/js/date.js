let date = {
    dateNumber: () => {
        const dn = new Date().getDate();
        if (dn < 10){
            dn = `0{dn}`;
        }
        return dn;
    },
    month: () => {
        const m = new Date().getMonth();
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        
        return months[m];
    },
    year: () => {
        const year = new Date().getFullYear();
        return year;
    }
}
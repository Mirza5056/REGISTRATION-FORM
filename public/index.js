document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('signup').addEventListener('click', async (ev)=>{
        ev.preventDefault();
        const firstName=document.getElementById('firstName').value;
        const lastName=document.getElementById('lastName').value;
        const email=document.getElementById('email').value;
        const password=document.getElementById('current-pass').value;
        const address=document.getElementById('address').value;
        const gender=document.getElementsByName('gender');
        const firstNameErrorSection=document.getElementById('firstNameErrorSection');
        const lastNameErrorSection=document.getElementById('lastNameErrorSection');
        const emailErrorSection=document.getElementById('emailErrorSection');
        const passwordErrorSection=document.getElementById('passwordErrorSection');
        const addressErrorSection=document.getElementById('addressErrorSection');
        firstNameErrorSection.textContent='';
        lastNameErrorSection.textContent='';
        emailErrorSection.textContent='';
        passwordErrorSection.textContent='';
        addressErrorSection.textContent='';
        if(firstName.length == '') {
            firstNameErrorSection.textContent='Name Required';
            return;
        }
        if(firstName.length < 3 || firstName.length > 20) {
            firstNameErrorSection.textContent='Name Should not be less than 3 or greater than 20';
            return;
        }
        if(lastName.length == '') {
            lastNameErrorSection.textContent='Last Name Required';
            return;
        }
        if(lastName.length < 3 || lastName.length > 10) {
            lastNameErrorSection.textContent='Last Name Should not be less than 3 or greater than 10';
            return;
        }
        if(email.length == '') {
            emailErrorSection.textContent='email required';
            return;
        }
        if(!email.includes('@')) {
            emailErrorSection.textContent='Not a Valid Email';
            return;
        }
        if(address.length == '') {
            addressErrorSection.textContent='Address Required';
            return;
        }
        if(address.length < 3) {
            addressErrorSection.textContent='Address Should Not Be Less Than 3 char';
            return;
        } 
        if(password.length == '') {
            passwordErrorSection.textContent='Password required';
            return;
        }
        if(password.length < 3 || password.length > 8) {
            passwordErrorSection.textContent='Password Should not be less than 3 or greater than 8';
            return;
        }
        let genderGotIt=null;
        for(var i=0; i<gender.length; i++) {
            if(gender[i].checked) {
                genderGotIt=gender[i].value;
                break;
            }
        }
        const data={
            firstName,
            lastName,
            email,
            password,
            address,
            gender : genderGotIt
        };
        try
        {
            fetch('/addUsers',{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(data)
            }).then((response)=>{
                response.json();
            }).then((data)=>{
                console.log(data);
                alert('Successfully Submitted');
                document.getElementById('firstName').value=' ';
                document.getElementById('lastName').value=' ';
                document.getElementById('email').value=' ';
                document.getElementById('current-pass').value=' ';
                document.getElementById('address').value=' ';
            }).catch((error)=> console.log(error));
        }catch(error) {
            console.log(error);
            alert(error);
        }
        //alert(firstName+" "+lastName+" "+email+" "+password+" "+address+" "+genderGotIt);
    });
});
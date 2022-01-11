function deleteContact(name, number) {
    let url = "/deleteNumber";
    let data = {name , number};
    console.log(data);
    const options = {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
    }
    fetch("/deleteNumber", options);
    window.location.reload();
}

const bcrypt = require('bcrypt');

let paswort = "";

process.stdin.setRawMode(true);

process.stdin.on('data', buf => {
    if(buf.toString('hex') == '03') process.exit(0);



    if(buf.toString('hex') == '0d') {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
    
        console.log(bcrypt.hash(paswort, 10, (err, enc) => {
            if(err) return console.log(err);

            console.log(enc);
        }));

        paswort = "";
    } else {
        paswort += buf.toString('utf-8');
        process.stdout.write(buf.toString('utf-8'));
    }
});

//$2b$10$XKCuwlvDYbHvMGxFn0UpcO5ONM1eBWC569U0copLKHDULTWfwjhA2

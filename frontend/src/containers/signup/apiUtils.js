const subscribeSNSTopic = async(email) => {
  const res = await fetch('https://qva5a5z4mg.execute-api.us-east-1.amazonaws.com/dev/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email }),
  });

  console.log(res);
};

export {
  subscribeSNSTopic,
}
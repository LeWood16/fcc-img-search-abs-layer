// so this clearly has to do with the set media type

// I THINK that the browser is trying to guess the 
// media type, and downloads it as a result


// ====== Invalid MIME types ==============

//  res.setHeader('content-type', 'text');
//  res.setHeader('content-type', 'plain');
//  res.setHeader('content-type', 'html');

//  TypeError: invalid media type

//  res.setHeader('content-type', 'plain/text');
//  res.setHeader('content-type', 'plain/html');
//  res.setHeader('content-type', 'html/plain');
//  res.setHeader('content-type', 'html/text');

//  triggers the download;




// ====== Valid MIME types ==============

//  res.setHeader('content-type', 'text/plain');
//  res.setHeader('content-type', 'text/html');
//  not setting a header at all 

// returns {"0":"foobar"} as expected; no download;



//  added res.setHeader('content-type', 'plain/text');
// to the /server route, no download; only when 







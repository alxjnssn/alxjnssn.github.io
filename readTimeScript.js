(function () {
    if (\$('body').hasClass('single-page')) {
      var totalCharacters = 0;
      var imgCount;
      var imgTime;

      function walkTheDOM(node, func) {
          func(node);
          node = node.firstChild;
          while (node) {
              walkTheDOM(node, func);
              node = node.nextSibling;
          }
      }

      walkTheDOM(document.querySelector('.entry-wrapper > .entry'), function (node) {
          if (node.nodeType === 3) { 
              var text = node.data.trim();
              if (text.length > 0) { 
                totalCharacters = totalCharacters + text.length
              }
          } else if (node.tagName === 'IMG') {
                accountForImageTime(node);
          }
      });

      function accountForImageTime(imgNode) {
        imgCount++
        if (imgCount <= 7) {
          imgTime = imgTime + imgCount;
        } else {
          imgTime = imgTime + 3
        }
      }

      function readTime(totalChars) {
        var averageWordLength = 5;
        var totalWords = totalChars / averageWordLength;
        var wpm = 180;
        var readTime = Math.round(totalWords / 180);
        readTime < 1 ? readTime = 1 : readTime;
        return readTime
      }

      function appendReadTime(totalReadTime) {
        var node = document.createElement('span');                 
        var textnode = document.createTextNode(totalReadTime +  ' Minute Read');         
        node.appendChild(textnode);                              
        document.querySelector('.meta-wrapper > .meta-inner > .meta').appendChild(node);
      }

      appendReadTime(readTime(totalCharacters));
    }
  })();
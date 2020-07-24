if (window.location.href.indexOf('post.php') !== -1) {
  var postfunc = this.postfunc;
  var autopreview = function () {
    if (!postfunc.o_pvwindow) document.body.appendChild(_$('/span', (postfunc.o_pvwindow = commonui.createCommmonWindow(1))));
    var w = window,
      $ = _$,
      op = postfunc.o_pvwindow,
      opc = op.parentNode,
      pc = $('/div').$0('className', 'postcontent ubbcode', 'innerHTML', postfunc.o_content.value.replace(/\t/g, '&emsp;&emsp;').replace(/\n/g, '<br/>').replace(/\r/g, ''));
    op.style.width = $('mmc') ? Math.round($('mmc').offsetWidth * 0.9) + 'px' : '800px';
    opc.style.visibility = 'hidden';
    op._.addContent(null);
    op._.addTitle('发帖预览');
    op._.addContent($('/div').$0('className', 'fastViewPost', $('/div').$0('className', 'forumbox', $('/div').$0('className', 'postrow', $('/div').$0('className', 'c2', pc)))));
    op._.show();

    ubbcode.bbsCode({
      c: pc,
      opt: 1,
      tId: Math.floor(Math.random * 10000),
      pId: Math.floor(Math.random * 10000),
      authorId: w.__CURRENT_UID,
      noImg: 0,
      rvrc: w.__GP.rvrc,
      isLesser: w.__GP.lesser,
    });
    return pc.innerHTML.replace(/<div class="quote" style="background-color:#797770">/g, '<div class="quote" style="background-color:#f9efd6">');
  };
  for (var i = 0; i < document.getElementsByTagName('button').length; i++) {
    var preview_button = document.getElementsByTagName('button')[i];
    if (preview_button.innerHTML === '预览') {
      var autopreview_button = document.createElement('button');
      autopreview_button.type = 'button';
      autopreview_button.innerHTML = '实时预览';
      autopreview_button.addEventListener('click', function () {
        var post_content = document.getElementsByName('post_content')[0];
        var autopreview_content = document.createElement('div');
        post_content.style.width = '50%';
        post_content.style.minWidth = '20%';
        post_content.style.maxWidth = '80%';
        post_content.style.minHeight = '150px';
        autopreview_content.style.width = 'calc(50% - 1.08em - 16px)';
        autopreview_content.style.minWidth = 'calc(20% - 1.08em - 16px)';
        autopreview_content.style.maxWidth = 'calc(80% - 1.08em - 16px)';
        autopreview_content.style.minHeight = '150px';
        autopreview_content.style.height = 'calc(' + post_content.style.height + ' + 0.28em - 12px)';
        autopreview_content.style.overflow = 'auto';
        autopreview_content.style.lineHeight = post_content.style.lineHeight;
        autopreview_content.style.fontSize = '1.083em';
        autopreview_content.style.border = '1px solid #e0c19e';
        autopreview_content.style.boxShadow = '0 0 2px 0 #bbb inset';
        autopreview_content.style.borderRadius = '0.25em';
        autopreview_content.style.background = '#fff0cd';
        autopreview_content.style.padding = '6px';
        autopreview_content.style.margin = '0.1em 0.2em';
        autopreview_content.style.display = 'inline-block';
        autopreview_content.style.verticalAlign = 'top';
        autopreview_content.classList.add('postcontent', 'ubbcode');
        autopreview_content.innerHTML = "<div style='line-height:calc(" + post_content.style.height + " / 2);text-align:center;color:gray;font-size:2em;'>(实时预览窗口)</div>";
        post_content.parentElement.appendChild(autopreview_content);
        post_content.parentElement.parentElement.classList.add('postrow');
        // textarea input|blur|focus
        post_content.addEventListener('input', function (e) {
          if (e.target.value.length <= 10000) {
            preview_tip_span.innerHTML = '<b>自动预览：</b>开启';
            autopreview_content.innerHTML = autopreview();
          } else {
            preview_tip_span.innerHTML = '<b>自动预览：</b>内容过长(>10000)，预览框在失去焦点时刷新';
          }
        });
        post_content.addEventListener('blur', function () {
          preview_tip_span.innerHTML = '<b>自动预览：</b>开启';
          autopreview_content.innerHTML = autopreview();
        });
        post_content.addEventListener('focus', function () {
          preview_tip_span.innerHTML = '<b>自动预览：</b>开启';
          autopreview_content.innerHTML = autopreview();
        });
        // textarea resize
        var observer = new MutationObserver(function () {
          autopreview_content.style.width = 'calc(100% - ' + post_content.style.width + ' - 1.08em - 16px)';
          autopreview_content.style.height = 'calc(' + post_content.style.height + ' + 0.28em - 12px)';
        });
        observer.observe(post_content, {
          attributes: true,
          attributeFilter: ['style'],
          attributeOldValue: false,
        });
        // add tips
        var preview_tip_span = document.createElement('span');
        preview_tip_span.style.float = 'right';
        preview_tip_span.style.paddingRight = '0.5em';
        preview_tip_span.innerHTML = '<b>自动预览：</b>就绪';
        preview_button.parentElement.appendChild(preview_tip_span);
        // remove old buttons
        autopreview_button.parentElement.removeChild(autopreview_button);
        preview_button.parentElement.removeChild(preview_button);
      });
      preview_button.parentElement.insertBefore(autopreview_button, preview_button);
      break;
    }
  }
}

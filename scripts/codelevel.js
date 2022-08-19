hexo.extend.tag.register('codelevel', function(args, content){
    // codelevel: easy medium hard

    var map = {
        'easy': ' 难度: <span style="color: rgba(90, 183, 38, 1);">简单</span>',
        'medium': '难度: <span style="color: rgba(255, 161, 25, 1);">中等</span>',
        'hard': '难度: <span style="color: rgba(239, 71, 67, 1);">困难</span>'
    };

    return map[args[0]];
  });


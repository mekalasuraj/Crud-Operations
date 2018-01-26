$(document).ready(function(){
    $('.edit-recipe').on('click', function(){
        $('#edit-form-name').val($(this).data('name'));
        $('#edit-form-ingredients').val($(this).data('ingredients'));
        $('#edit-form-directions').val($(this).data('directions'));
        $('#edit-form-id').val($(this).data('id'));
    });

    $(".delete-recipe").on('click', function(){
        var id=$(this).data('id');
        var url='/delete/'+id;
        if(confirm('Delete Recipe?')){
            $.ajax({
                url:url,
                type:'DELETE',
                success:function(result){
                    console.log('Deleting recipe');
                    window.location.href='/';
                },
                error:function(err){
                    console.log(err);
                }
            })
        }
    });

   /* $("#editSave").on('click', function(){
        var id=$(this).data('id');
        var url='/edit/'+id;
        if(confirm('Edit Recipe?')){
            $.ajax({
                url:url,
                type:'POST',
                success:function(result){
                    console.log('Editing recipe');
                    window.location.href='/';
                },
                error:function(err){
                    console.log(err);
                }
            })
        }
    });*/

});
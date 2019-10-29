var form, layer, element, row;
layui.use(['form', 'layedit', 'laydate', 'layer', 'element'], function () {
    form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , element = layui.element;
});

$("#dg").datagrid({
    columns: [[
        { field: "addressId", title: "地址Id", width: 80, align: "center" },
        { field: "streetName", title: "街道名称", width: 80, align: "center" },
        { field: "streetAddress", title: "街道地址", width: 80, align: "center" },
        { field: "city", title: "城市", width: 80, align: "center" },
        { field: "country", title: "国家", width: 80, align: "center" },
        { field: "zipCode", title: "邮编", width: 80, align: "center" },
        { field: "latitude", title: "纬度", width: 80, align: "center" },
        { field: "longitude", title: "经度", width: 80, align: "center" },
        { field: "created", title: "创建日期", width: 80, align: "center" },
        { field: "updated", title: "编辑日期", width: 80, align: "center" },
        {
            field: "action", title: "操作", width: 80, align: "center", formatter: function (value, row, index) {
                return `<i class="fa fa-eye mr-5" onclick="detailsAddress(this);"></i><i class="fa fa-edit mr-5" onclick="
editAddress(this);"></i><i class="fa fa-trash-o" onclick="deleteAddress(this);"></i>`;
            }
        },
    ]]
});

$('#dg').datagrid({
    onClickRow: function (index, field, value) {
        row = field;
    }
});

function detailsAddress(){
    setTimeout(function(){
        layer.open({
            btn: [],
            shade: 0,
            title: "地址信息",
            content: `<div class="mb-10"><span class="mr-5 bold">地址Id:</span><span>${row["addressId"]}</span></div><div class="mb-10"><span class="mr-5 bold">街道名称:</span><span>${row["streetName"]}</span></div><div  class="mb-10"><span class="mr-5 bold">街道地址:</span><span>${row["streetAddress"]}</span></div><div  class="mb-10"><span class="mr-5 bold">城市:</span><span>${row["city"]}</span></div><div  class="mb-10"><span class="mr-5 bold">国家:</span><span>${row["country"]}</span></div><div  class="mb-10"><span class="mr-5 bold">邮编:</span><span>${row["zipCode"]}</span></div><div  class="mb-10"><span class="mr-5 bold">纬度:</span><span>${row["latitude"]}</span></div><div  class="mb-10"><span class="mr-5 bold">经度:</span><span>${row["longitude"]}</span></div><div  class="mb-10"><span class="mr-5 bold">创建日期:</span><span>${row["created"]}</span></div><div  class="mb-10"><span class="mr-5 bold">编辑日期:</span><span>${row["updated"]}</span></div>`

        });
    }, 1000);
}

function createAddress(){
    setTimeout(function(){
        layer.open({
            btn: [],
            shade: 0,
            title: "新建地址",
            content: `<form class="layui-form layui-form-pane" action="">
                   <div class="layui-form-item">
                    <label class="layui-form-label">街道名称</label>
                    <div class="layui-input-inline">
                      <input type="text" name="streetName" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">街道地址</label>
                    <div class="layui-input-inline">
                      <input type="text" name="streetAddress" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required>
                    </div>
                  </div>
                     <div class="layui-form-item">
                    <label class="layui-form-label">城市</label>
                    <div class="layui-input-inline">
                      <input type="text" name="city" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">国家</label>
                    <div class="layui-input-inline">
                      <input type="text" name="country" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required>
                    </div>
                  </div>
                     <div class="layui-form-item">
                    <label class="layui-form-label">邮编</label>
                    <div class="layui-input-inline">
                      <input type="text" name="zipCode" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">纬度</label>
                    <div class="layui-input-inline">
                      <input type="text" name="latitude" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">经度</label>
                    <div class="layui-input-inline">
                      <input type="text" name="longitude" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required>
                    </div>
                  </div>
 <button type="submit" class="layui-btn layui-btn-normal fr">保存</button>
</form>`
        });
        document.getElementsByTagName("form")[0].addEventListener("submit",function(e){
            e.preventDefault();
            createAddressPost();
        });
    }, 1000);
}

function createAddressPost(){
    var form = document.getElementsByTagName("form")[0];
    var inputs = form.getElementsByTagName("input");
    var streetName = inputs[0].value;
    var streetAddress = inputs[1].value;
    var city = inputs[2].value;
    var country = inputs[3].value;
    var zipCode = inputs[4].value;
    var latitude = inputs[5].value;
    var longitude = inputs[5].value;
    $.ajax({
        type: "post",
        url: `http://localhost:8080/addresses`,
        data: {
            "streetName": streetName, "streetAddress": streetAddress, "city": city, "country": country, "zipCode": zipCode, "latitude": latitude, "longitude": longitude
        },
        dataType: "json",
        success: function (data) {
            if (data == 1){
                layer.closeAll();
                layer.msg("地址已创建");
                $('#dg').datagrid('reload');
            }
        },
        error: function (item, err) {
        }
    });
}

function editAddress(){
    setTimeout(function(){
        layer.open({
            btn: [],
            shade: 0,
            title: "编辑地址",
            content: `<form class="layui-form layui-form-pane" action="">
                 <div class="layui-form-item">
                    <label class="layui-form-label">街道名称</label>
                    <div class="layui-input-inline">
                      <input type="text" name="streetName" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${row["streetName"]}">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">街道地址</label>
                    <div class="layui-input-inline">
                      <input type="text" name="streetAddress" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required value="${row["streetAddress"]}">
                    </div>
                  </div>
                     <div class="layui-form-item">
                    <label class="layui-form-label">城市</label>
                    <div class="layui-input-inline">
                      <input type="text" name="city" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${row["city"]}">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">国家</label>
                    <div class="layui-input-inline">
                      <input type="text" name="country" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required value="${row["country"]}">
                    </div>
                  </div>
                     <div class="layui-form-item">
                    <label class="layui-form-label">邮编</label>
                    <div class="layui-input-inline">
                      <input type="text" name="zipCode" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${row["zipCode"]}">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">纬度</label>
                    <div class="layui-input-inline">
                      <input type="text" name="latitude" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required value="${row["latitude"]}">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">经度</label>
                    <div class="layui-input-inline">
                      <input type="text" name="longitude" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required value="${row["longitude"]}">
                    </div>
                  </div>
 <button type="submit" class="layui-btn layui-btn-normal fr">保存</button>
</form>`
        });
        document.getElementsByTagName("form")[0].addEventListener("submit",function(e){
            e.preventDefault();
            editAddressPost();
        });
    }, 1000);
}

function editAddressPost(){
    var form = document.getElementsByTagName("form")[0];
    var id = row.addressId;
    var inputs = form.getElementsByTagName("input");
    var streetName = inputs[0].value;
    var streetAddress = inputs[1].value;
    var city = inputs[2].value;
    var country = inputs[3].value;
    var zipCode = inputs[4].value;
    var latitude = inputs[5].value;
    var longitude = inputs[5].value;
    $.ajax({
        type: "post",
        url: `http://localhost:8080/addresses/${id}`,
        data: {
            "streetName": streetName, "streetAddress": streetAddress, "city": city, "country": country, "zipCode": zipCode, "latitude": latitude, "longitude": longitude
        },
        dataType: "json",
        success: function (data) {
            if (data == 1){
                layer.closeAll();
                layer.msg("地址已编辑");
                $('#dg').datagrid('reload');
            }
        },
        error: function (item, err) {
        }
    });
}

function deleteAddress() {
    setTimeout(function(){
        layer.open({
        btn: [],
        shade: 0,
        title: "删除地址",
        content: `<div><div class="mb-15 tc">确定删除地址?</div><div class="tr"><button id="buttonDelete" type="submit" class="layui-btn layui-btn-danger">删除</button></div></div>`
        });
        document.getElementById("buttonDelete").addEventListener("click",function(e){
            deleteAddressPost();
        });
    }, 1000);
}

function deleteAddressPost() {
    var id = row.addressId;
    $.ajax({
        type: "get",
        url: `http://localhost:8080/deleteAddress/${id}`,
        dataType: "json",
        success: function (data) {
            if (data == 1) {
                layer.closeAll();
                layer.msg("地址已删除");
                $('#dg').datagrid('reload');
            }
        },
        error: function (item, err) {
            console.log(err);
        }
    });
}

function searchAddress(){
    var searchTerm = document.getElementById('inputSearchAddress').value;
    var searchTermFinal = "";
    if (searchTerm !== ""){
        searchTermFinal = searchTerm;
    }
    $("#dg").datagrid({
        url: `http://localhost:8080/searchAddress?term=${searchTermFinal}`,
        method: 'get',
        onLoadSuccess: function (data) {
        }
    });

}

function main(){
    $("#dg").datagrid({
        url: `http://localhost:8080/indexPaginated`,
        method: 'get',
        onLoadSuccess: function (data) {
        }
    });
}

main();
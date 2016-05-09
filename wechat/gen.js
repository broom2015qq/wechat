/**
 * Created by sunny on 16/5/2.
 */
//生成期函数,function后面加个*
var gen = function* (n){
	for (var i = 0; i < 3; i++) {
		n++
		yield n
	}
}
//调用gen函数，genobj是个迭代器对象，并不执行，next才执行
var genObj = gen(2)
console.log(genObj.next())//{value:3,done:false}
console.log(genObj.next())//{value:4,done:false}
console.log(genObj.next())//{value:5,done:false}
console.log(genObj.next())//{value:undifined,done:true}

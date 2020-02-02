		


/**
 * 
 * 사용자 최종학력에 따른 이벤트
 * 
 * @date 2015. 08. 12.
 * @author 안진용
 * @example 
 */
jQuery(document).ready(function(){
	var LAST_LEDU_CD = jQuery("input[name='LAST_LEDU_CD']").val();
	//고등학교
	if(LAST_LEDU_CD=="01"){
		jQuery("#collP").remove();
		jQuery("#collDiv").remove();
		jQuery("#univP").remove();
		jQuery("#univDiv").remove();
		jQuery("#masP").remove();
		jQuery("#masDiv").remove();
		jQuery("#docP").remove();
		jQuery("#docDiv").remove();
		jQuery("#etcP").remove();
		jQuery("#etcDiv").remove();
	}
	//전문대
	if(LAST_LEDU_CD=="02"){
		jQuery("#univP").remove();
		jQuery("#univDiv").remove();
		jQuery("#masP").remove();
		jQuery("#masDiv").remove();
		jQuery("#docP").remove();
		jQuery("#docDiv").remove();
		jQuery("#etcP").remove();
		jQuery("#etcDiv").remove();
	}
	//대학교일때
	if(LAST_LEDU_CD=="03"){
		jQuery("#masP").remove();
		jQuery("#masDiv").remove();
		jQuery("#docP").remove();
		jQuery("#docDiv").remove();
		jQuery("#etcP").remove();
		jQuery("#etcDiv").remove();
	}

	//대학원(석사)
	if(LAST_LEDU_CD=="04"){
		jQuery("#docP").remove();
		jQuery("#docDiv").remove();
		jQuery("#etcP").remove();
		jQuery("#etcDiv").remove();
	}

	//대학원(석사)
	if(LAST_LEDU_CD=="05"){
		jQuery("#etcP").remove();
		jQuery("#etcDiv").remove();
	}

	//기타
	if(LAST_LEDU_CD=="99"){
		jQuery("#highP").remove();
		jQuery("#highDiv").remove();
		jQuery("#collP").remove();
		jQuery("#collDiv").remove();
		jQuery("#univP").remove();
		jQuery("#univDiv").remove();
		jQuery("#masP").remove();
		jQuery("#masDiv").remove();
		jQuery("#docP").remove();
		jQuery("#docDiv").remove();	
	}	
});





/**
 * 
 * 고등학교 - 검정고시 합격 체크에 대한 이벤트에 따라 함수 호출
 * checked() : 체크시 졸업년도를 제외한 값 초기화 및 비활성화(필수 입력 제외)
 * unchecked() : 체크해제시 모두 활성화(필수 입력)
 * @date 2015. 08. 15.
 * @author 안진용
 * @example 
 */
if(jQuery("input:checkbox[name='highGedYn']").is(":checked")){
	checked();
}else{
	unchecked();
}
	
$("#nsType").change(function(){
	if($("#nsType").is(":checked")){
    	checked();
    }else{
    	unchecked();
    }
});
  
function checked(){
	jQuery("input[name='highGedYn']").val("Y");
	jQuery("#highTable").find("input").val("");
	//jQuery("#highTable").find("input").attr("disabled","disabled");
	jQuery("select[name='highMtrcYear']").attr("disabled","disabled");
	jQuery("select[name='highMtrcMonth']").attr("disabled","disabled");
	jQuery("select[name='highdyntCd']").attr("disabled","disabled");
	
	jQuery("#highDiv a").attr("href","javascript:#");	
	jQuery("#highTable").find("select").not("#highGrdtYear,#highGrdtMonth,#highGrdtCd").find("option:first").attr("selected","selected");
	//jQuery("#highTable").find("select").not("#highGrdtYear,#highGrdtMonth").attr("disabled","disabled");
}
function unchecked(){
	jQuery("input[name='highGedYn']").val("N");	
	//jQuery("#highTable").find("select").removeAttr("disabled");
	jQuery("select[name='highMtrcYear']").removeAttr("disabled","disabled");
	jQuery("select[name='highMtrcMonth']").removeAttr("disabled","disabled");
	jQuery("select[name='highdyntCd']").removeAttr("disabled","disabled");
	jQuery("#highDiv a").attr("href","javascript:schlPopUp('01','','')");
	
}
 




/**--------------전문대 부분---------------------------**/

/**
 * 
 * 전문대 이벤트 - 폼 추가
 * 
 * @date 2015. 08. 15.
 * @author 안진용
 * @example 
 */
jQuery(document).ready(function(){
	var LAST_LEDU_CD = jQuery("input[name='LAST_LEDU_CD']").val();
	
	//수정시 최종학력 제외한 추가된 폼 학교 및 전공 학교검색 노출
	jQuery("#spanColl").find("table").each(function(e){
		if(LAST_LEDU_CD == "02")
		{
			if(e > 0)
			{
				jQuery("#spanColl").find("table").eq(e).find(".collPop").css("display", "");
			}			
		}
		else
		{
			jQuery("#spanColl").find("table").eq(e).find(".collPop").css("display", "");
		}
	});	
	
	var CollCnt = jQuery("#spanColl").find("table").length;
	
	jQuery("#addColl").click(function(){
		if(CollCnt >= 3)
		{
			alert("최대 3개까지 입력 가능합니다.");
		}
		else
		{
			var Coll = jQuery("#spanColl").find("table").eq(0).clone(true);
			
			Coll.css("border-top","1px solid #555");	//추가된 태그에 스타일적용
			Coll.find("input").removeClass();
			Coll.find("input").val("");
			Coll.find("select").find("option:first").attr("selected","selected");
			jQuery("#spanColl").append(Coll);
			
			jQuery("#spanColl").find("table").eq(CollCnt).find(".collPop").css("display","");
			jQuery("#spanColl").find("table").eq(CollCnt).find("input[name='collSchlLctnNm']").attr("readonly","readonly");
			jQuery("#spanColl").find("table").eq(CollCnt).find("a").attr("codeId",(CollCnt+1));
			jQuery("#spanColl").find("table .check3").eq(CollCnt).attr("index", CollCnt);
			
			//졸업년도, 졸업구분 추가된 폼은 disabled해제
			jQuery("#spanColl").find("table").eq(CollCnt).find("select[name='collGrdtYear']").removeAttr("disabled");
			jQuery("#spanColl").find("table").eq(CollCnt).find("select[name='collGrdtMonth']").removeAttr("disabled");
			jQuery("#spanColl").find("table").eq(CollCnt).find("select[name='collGrdtCd']").removeAttr("disabled");
			
			jQuery("#spanColl").find("table").eq(CollCnt).find("input, select").each(function(){
				var trgrId = jQuery(this).attr("id");
				var trgrTitle = jQuery(this).attr("title");
				
				if(typeof trgrId != "undefined")
				{
					jQuery(this).attr("id", trgrId.substring(0, trgrId.length-1)+(CollCnt+1));
				}
				if(typeof trgrTitle != "undefined")
				{
					jQuery(this).attr("title", trgrTitle.substring(0, trgrTitle.length-1)+(CollCnt+1));
				}
			});
			
			jQuery("form[name=frm]").append("<input type='hidden' name='collseq' value=''/>");

			CollCnt++;			
		}	
	});

	/**
	 * 
	 * 전문대 이벤트 - 폼 제거
	 * 
	 * @date 2015. 08. 15.
	 * @author 안진용
	 * @example 
	 */	
	jQuery("#delColl").click(function(){
		var delSeq = jQuery("#spanColl").find("table").last().find("input[name='collseq']").val();
		
		if(typeof delSeq != "undefined")
		{
			jQuery("form[name='frm']").append("<input type='hidden' name='collDelSeq' value='"+delSeq+"'>");
		}
		else
		{
			delSeq = jQuery("form[name='frm']").find("input[name='collseq']").last().val();
			jQuery("form[name='frm']").append("<input type='hidden' name='collDelSeq' value='"+delSeq+"'>");
		}
		
		if(CollCnt > 1)
		{
			jQuery("#spanColl").find("table").last().remove();		
			jQuery("#spanColl").find("table").eq(CollCnt).find("a").attr("codeId",(CollCnt-1));
			CollCnt--;
		}
		else
		{
			if(LAST_LEDU_CD!="02")
			{
				jQuery("#spanColl").find("table").find("select").find("option:first").attr("selected","selected");
				jQuery("#spanColl").find("table").find("input").val("");				
			}
		}
	});
});












/**
 * 
 * 대학교 이벤트 - 폼 추가
 * 
 * @date 2015. 08. 15.
 * @author 안진용
 * @example 
 */
jQuery(document).ready(function(){
	var LAST_LEDU_CD = jQuery("input[name='LAST_LEDU_CD']").val();
	
	//수정시 최종학력 제외한 추가된 폼 학교 및 전공 학교검색 노출
	jQuery("#spanUniv").find("table").each(function(e){
		if(LAST_LEDU_CD == "03")
		{
			if(e > 0)
			{
				jQuery("#spanUniv").find("table").eq(e).find(".univPop").css("display", "");
			}			
		}
		else
		{
			jQuery("#spanUniv").find("table").eq(e).find(".univPop").css("display", "");
		}
	});
	
	var spanUniv = jQuery("#spanUniv").find("table").length;
	
	jQuery("#addUniv").click(function(){
		if(spanUniv >= 3)
		{
			alert("최대 3개까지 입력 가능합니다.");
		}
		else
		{
			var Univ = jQuery("#spanUniv").find("table").eq(0).clone(true);
			
			Univ.css("border-top","1px solid #555");	//추가된 태그에 스타일적용
			Univ.find("input").val("");
			Univ.find("input").removeClass();
			Univ.find("select").find("option:first").attr("selected","selected");
			Univ.find("input:checkbox[id='edu1']").attr("checked", false);
			
			Univ.find("input:checkbox[id='edu1']").attr("id","edu"+(spanUniv+1));
//			
//			Univ.find("input:text[name='univMtrcSchlNm']").attr("id","univMtrcSchlNm"+(spanUniv+1));
//			Univ.find("input:text[name='univMtrcSchlNm']").attr("title","입학 대학교 학교명"+(spanUniv+1));
//			Univ.find("select[name='univMtrcSchlDyntCd']").attr("id","univMtrcSchlDyntCd"+(spanUniv+1));
//			Univ.find("select[name='univMtrcSchlDyntCd']").attr("title","입학 대학교 주/야간"+(spanUniv+1));
//			Univ.find("input:text[name='univMtrcSchlLctnNm']").attr("id","univMtrcSchlLctnNm"+(spanUniv+1));
//			Univ.find("input:text[name='univMtrcSchlLctnNm']").attr("title","입학 대학교 소재지"+(spanUniv+1));
//			Univ.find("select[name='univMtrcYear']").attr("id","univMtrcYear"+(spanUniv+1));
//			Univ.find("select[name='univMtrcYear']").attr("title","대학교 입학년도 선택"+(spanUniv+1));
//			Univ.find("select[name='univMtrcMonth']").attr("id","univMtrcMonth"+(spanUniv+1));
//			Univ.find("select[name='univMtrcMonth']").attr("title","대학교 입학월"+(spanUniv+1));
//			Univ.find("input:text[name='univMtrcSchlMjrNm']").attr("id","univMtrcSchlMjrNm"+(spanUniv+1));
//			Univ.find("input:text[name='univMtrcSchlMjrNm']").attr("title","대학교 입학 주전공"+(spanUniv+1));
//			Univ.find("select[name='univTrsfYn']").attr("id","univTrsfYn"+(spanUniv+1));
//			Univ.find("select[name='univTrsfYn']").attr("title","편입여부 선택"+(spanUniv+1));
//			
//			Univ.find("input:text[name='univSchlNm']").attr("id","univSchlNm"+(spanUniv+1));
//			Univ.find("input:text[name='univSchlNm']").attr("title","졸업 대학교 학교명"+(spanUniv+1));
//			Univ.find("select[name='univdyntCd']").attr("id","univdyntCd"+(spanUniv+1));
//			Univ.find("select[name='univdyntCd']").attr("title","졸업 대학교 주/야간"+(spanUniv+1));
//			Univ.find("input:text[name='univSchlLctnNm']").attr("id","univSchlLctnNm"+(spanUniv+1));
//			Univ.find("input:text[name='univSchlLctnNm']").attr("title","졸업 대학교 소재지"+(spanUniv+1));
//			Univ.find("select[name='univGrdtYear']").attr("id","univGrdtYear"+(spanUniv+1));
//			Univ.find("select[name='univGrdtYear']").attr("title","대학교 졸업년도 선택"+(spanUniv+1));
//			Univ.find("select[name='univGrdtMonth']").attr("id","univGrdtMonth"+(spanUniv+1));
//			Univ.find("select[name='univGrdtMonth']").attr("title","대학교 졸업월 선택"+(spanUniv+1));
//			Univ.find("select[name='univGrdtCd']").attr("id","univGrdtCd"+(spanUniv+1));
//			Univ.find("select[name='univGrdtCd']").attr("title","대학교 졸업구분"+(spanUniv+1));
//			Univ.find("input:text[name='univMjrNm']").attr("id","univMjrNm"+(spanUniv+1));
//			Univ.find("input:text[name='univMjrNm']").attr("title","대학교 졸업 주전공"+(spanUniv+1));
//			Univ.find("input:text[name='univDmjrNm']").attr("id","univDmjrNm"+(spanUniv+1));
//			Univ.find("input:text[name='univDmjrNm']").attr("title","대학교 졸업 복수(이중)전공"+(spanUniv+1));
//			Univ.find("input:text[name='univMnrNm']").attr("id","univMnrNm"+(spanUniv+1));
//			Univ.find("input:text[name='univMnrNm']").attr("title","대학교 졸업 부전공"+(spanUniv+1));
//			Univ.find("input:text[name='univRcd']").attr("id","univRcd"+(spanUniv+1));
//			Univ.find("input:text[name='univRcd']").attr("title","대학교 졸업 학점"+(spanUniv+1));
			
			jQuery("#spanUniv").append(Univ);
			
			jQuery("#spanUniv").find("table").eq(spanUniv).find("a").attr("codeId",(spanUniv+1));
			jQuery("#spanUniv").find("table").eq(spanUniv).find(".univPop").css("display","");
			jQuery("#spanUniv").find("table").eq(spanUniv).find("input[name='univMtrcSchlLctnNm']").attr("readonly","readonly");	
			jQuery("#spanUniv").find("table .check3").eq(spanUniv).attr("index", spanUniv);
			
			//입학 학교/전공 정보와 동일 체크박스 index값 부여
			jQuery("#spanUniv").find("table").eq(spanUniv).find("input:checkbox[name='chkCopy']").attr("index",spanUniv);
			jQuery("#spanUniv").find("table").eq(spanUniv).find("input:checkbox[name='chkCopy']").removeAttr("disabled");
			
			//졸업년도, 졸업구분 추가된 폼은 disabled해제
			jQuery("#spanUniv").find("table").eq(spanUniv).find("select[name='univGrdtYear']").removeAttr("disabled");
			jQuery("#spanUniv").find("table").eq(spanUniv).find("select[name='univGrdtMonth']").removeAttr("disabled");
			jQuery("#spanUniv").find("table").eq(spanUniv).find("select[name='univGrdtCd']").removeAttr("disabled");
			
			jQuery("#spanUniv").find("table").eq(spanUniv).find("input, select").each(function(){
				var trgrId = jQuery(this).attr("id");
				var trgrTitle = jQuery(this).attr("title");
				
				if(typeof trgrId != "undefined")
				{
					jQuery(this).attr("id", trgrId.substring(0, trgrId.length-1)+(spanUniv+1));
				}
				if(typeof trgrTitle != "undefined")
				{
					jQuery(this).attr("title", trgrTitle.substring(0, trgrTitle.length-1)+(spanUniv+1));
				}
			});
			
			jQuery("form[name=frm]").append("<input type='hidden' name='univSeq' value=''/>");
			
			spanUniv++;
			
			Univ.attr("id","univTable"+spanUniv);
			Univ.find("#edu1").val(spanUniv);
		}	
	});
	
	/**
	 * 
	 * 대학교 이벤트 - 폼 제거
	 * 
	 * @date 2015. 08. 15.
	 * @author 안진용
	 * @example 
	 */	
	jQuery("#delUniv").click(function(){
		var delSeq = jQuery("#spanUniv").find("table").last().find("input[name='univSeq']").val();
		
		if(typeof delSeq != "undefined")
		{
			jQuery("form[name='frm']").append("<input type='hidden' name='univDelSeq' value='"+delSeq+"'>");
		}
		else
		{
			delSeq = jQuery("form[name='frm']").find("input[name='univSeq']").last().val();
			jQuery("form[name='frm']").append("<input type='hidden' name='univDelSeq' value='"+delSeq+"'>");
		}
		if(spanUniv > 1)
		{		
			jQuery("#spanUniv").find("table").last().remove();
			jQuery("#spanUniv").find("table").eq(spanUniv).find("a").attr("codeId",(spanUniv-1));
			spanUniv--;
		}
		else
		{
			if(LAST_LEDU_CD != "03")
			{
				jQuery("#spanUniv").find("table").find("select").find("option:first").attr("selected","selected");
				jQuery("#spanUniv").find("table").find("input").val("");				
			}
		}
	});
});



/**
 * 
 * 입학 학교/전공 정보와 동일 이벤트
 * 
 * @date 2015. 08. 15.
 * @author 안진용
 * @example 
 */
jQuery(document).ready(function(){
	var lastLeduCd_gubun = jQuery("input[name='lastLeduCd_gubun']").val();
	
	jQuery("input:checkbox[name='chkCopy']").each(function(){
		jQuery(this).click(function(){
			var same = this.checked;
			var index = parseInt(jQuery(this).attr("index"));
			
			if(same)
			{
				var univMtrcSchlCd = jQuery("#spanUniv").find("table").eq(index).find("input[name='univMtrcSchlCd']").val();
				var univMtrcSchlNm = jQuery("#spanUniv").find("table").eq(index).find("input[name='univMtrcSchlNm']").val();
				var univMtrcSchlLctnNm = jQuery("#spanUniv").find("table").eq(index).find("input[name='univMtrcSchlLctnNm']").val();
				var univMtrcSchlDyntCd = jQuery("#spanUniv").find("table").eq(index).find("select[name='univMtrcSchlDyntCd']").val();
				
				var univmtrcAfltCd = jQuery("#spanUniv").find("table").eq(index).find("input[name='univmtrcAfltCd']").val();
				var univmtrcAfltCdNm = jQuery("#spanUniv").find("table").eq(index).find("input[name='univmtrcAfltCdNm']").val();
				var univMtrcSchlMjrCd = jQuery("#spanUniv").find("table").eq(index).find("input[name='univMtrcSchlMjrCd']").val();
				var univMtrcSchlMjrNm = jQuery("#spanUniv").find("table").eq(index).find("input[name='univMtrcSchlMjrNm']").val();
				
				jQuery("#spanUniv").find("table").eq(index).find("input[name='univSchlCd']").val(univMtrcSchlCd);
				jQuery("#spanUniv").find("table").eq(index).find("input[name='univSchlNm']").val(univMtrcSchlNm);
				jQuery("#spanUniv").find("table").eq(index).find("input[name='univSchlLctnNm']").val(univMtrcSchlLctnNm);
				
				jQuery("#spanUniv").find("table").eq(index).find("input[name='univafltCd']").val(univmtrcAfltCd);
				jQuery("#spanUniv").find("table").eq(index).find("input[name='univafltNm']").val(univmtrcAfltCdNm);
				jQuery("#spanUniv").find("table").eq(index).find("input[name='univMjrCd']").val(univMtrcSchlMjrCd);
				jQuery("#spanUniv").find("table").eq(index).find("input[name='univMjrNm']").val(univMtrcSchlMjrNm);
				jQuery("#spanUniv").find("table").eq(index).find("select[name='univMtrcSchlDyntCd']").val(univMtrcSchlDyntCd);
				
			}else{
				jQuery("#spanUniv").find("table").eq(index).find("input[name='univSchlCd']").val('');
				jQuery("#spanUniv").find("table").eq(index).find("input[name='univSchlNm']").val('');
				jQuery("#spanUniv").find("table").eq(index).find("input[name='univSchlLctnNm']").val('');
				jQuery("#spanUniv").find("table").eq(index).find("input[name='univafltCd']").val('');
				jQuery("#spanUniv").find("table").eq(index).find("input[name='univafltNm']").val('');
				jQuery("#spanUniv").find("table").eq(index).find("input[name='univMjrCd']").val('');
				jQuery("#spanUniv").find("table").eq(index).find("input[name='univMjrNm']").val('');
				
				jQuery("#spanUniv").find("table").eq(index).find("input[name='univdyntCd']").find("option:first").attr("selected","selected");
				jQuery("#spanUniv").find("table").eq(index).find("input[name='univGrdtYear']").find("option:first").attr("selected","selected");
				jQuery("#spanUniv").find("table").eq(index).find("input[name='univGrdtMonth']").find("option:first").attr("selected","selected");	
				jQuery("#spanUniv").find("table").eq(index).find("input[name='univdyntCd']").find("option:first").attr("selected","selected");
			}
		});
	});
});


	
/**
 * 
 * 대학원 이벤트(석사) - 폼 추가
 * 
 * @date 2015. 08. 15.
 * @author 안진용
 * @example 
 */
jQuery(document).ready(function(){
	var LAST_LEDU_CD = jQuery("input[name='LAST_LEDU_CD']").val();
	
	//수정시 최종학력 제외한 추가된 폼 학교 및 전공 학교검색 노출
	jQuery("#spanMaster").find("table").each(function(e){
		/*
		if(LAST_LEDU_CD == "04")
		{
			if(e > 0)
			{
				jQuery("#spanMaster").find("table").eq(e).find(".masPop").css("display", "");
			}			
		}
		else
		{
			jQuery("#spanMaster").find("table").eq(e).find(".masPop").css("display", "");
		}
		*/
	});

	var spanMaster = jQuery("#spanMaster").find("table").length;
	
	jQuery("#addMaster").click(function(){
		if(spanMaster >= 3)
		{
			alert("최대 3개까지 입력 가능합니다.");
		}
		else
		{
			var Master = jQuery("#spanMaster").find("table").eq(0).clone(true);
			
			Master.css("border-top","1px solid #555");	//추가된 태그에 스타일적용
			Master.find("input").val("");
			Master.find("input").removeClass();
			Master.find("select").find("option:first").attr("selected","selected");
			
			jQuery("#spanMaster").append(Master);
			jQuery("#spanMaster").find("table").eq(spanMaster).find("a").attr("codeId",(spanMaster+1));
			jQuery("#spanMaster").find("table").eq(spanMaster).find(".masPop").css("display","");
			jQuery("#spanMaster").find("table").eq(spanMaster).find("input[name='masSchlLctnNm']").attr("readonly","readonly");

			jQuery("#spanMaster").find("table .check3").eq(spanMaster).attr("index", spanMaster);
			
			//졸업년도, 졸업구분 추가된 폼은 disabled해제
			jQuery("#spanMaster").find("table").eq(spanMaster).find("select[name='masGrdtYear']").removeAttr("disabled");
			jQuery("#spanMaster").find("table").eq(spanMaster).find("select[name='masGrdtMonth']").removeAttr("disabled");
			jQuery("#spanMaster").find("table").eq(spanMaster).find("select[name='masGrdtCd']").removeAttr("disabled");
			
			jQuery("#spanMaster").find("table").eq(spanMaster).find("input, select").each(function(){
				var trgrId = jQuery(this).attr("id");
				var trgrTitle = jQuery(this).attr("title");
				
				if(typeof trgrId != "undefined")
				{
					jQuery(this).attr("id", trgrId.substring(0, trgrId.length-1)+(spanMaster+1));
				}
				if(typeof trgrTitle != "undefined")
				{
					jQuery(this).attr("title", trgrTitle.substring(0, trgrTitle.length-1)+(spanMaster+1));
				}
			});
			
			jQuery("form[name=frm]").append("<input type='hidden' name='masSeq' value='' />");
			
			spanMaster++;
		}	
	});

	/**
	 * 
	 * 대학원 이벤트(석사) - 폼 제거
	 * 
	 * @date 2015. 08. 15.
	 * @author 안진용
	 * @example 
	 */	
	jQuery("#delMaster").click(function(){
		var delSeq = jQuery("#spanMaster").find("table").last().find("input[name='masSeq']").val();
		
		if(typeof delSeq != "undefined")
		{
			jQuery("form[name='frm']").append("<input type='hidden' name='masDelSeq' value='"+delSeq+"'>");
		}
		else
		{
			delSeq = jQuery("form[name='frm']").find("input[name='masSeq']").last().val();
			jQuery("form[name='frm']").append("<input type='hidden' name='masDelSeq' value='"+delSeq+"'>");
		}	
		
		if(spanMaster > 1)
		{		
			jQuery("#spanMaster").find("table").last().remove();
			spanMaster--;
		}
		else
		{
			if(LAST_LEDU_CD != "04")
			{
				jQuery("#spanMaster").find("table").find("select").find("option:first").attr("selected","selected");
				jQuery("#spanMaster").find("table").find("input").val("");				
			}
		}
	});	
});

	







/**
 * 
 * 대학원 이벤트(박사) - 폼 추가
 * 
 * @date 2015. 08. 15.
 * @author 안진용
 * @example 
 */
jQuery(document).ready(function(){
	var LAST_LEDU_CD = jQuery("input[name='LAST_LEDU_CD']").val();
	
	//수정시 최종학력 제외한 추가된 폼 학교 및 전공 학교검색 노출
	jQuery("#spanDoctor").find("table").each(function(e){
		/*
		if(LAST_LEDU_CD == "05")
		{
			if(e > 0)
			{
				jQuery("#spanDoctor").find("table").eq(e).find(".docPop").css("display", "");
			}			
		} 
		else
		{
			jQuery("#spanDoctor").find("table").eq(e).find(".docPop").css("display", "");
		}
		*/
	});	
	
	var spanDoctor = jQuery("#spanDoctor").find("table").length;
	
	jQuery("#addDoctor").click(function(){
		if(spanDoctor >= 3)
		{
			alert("최대 3개까지 입력 가능합니다.");
		}
		else
		{
			var Doctor = jQuery("#spanDoctor").find("table").eq(0).clone(true);
			
			Doctor.css("border-top","1px solid #555");	//추가된 태그에 스타일적용
			Doctor.find("input").val("");
			Doctor.find("input").removeClass();
			Doctor.find("select").find("option:first").attr("selected","selected");
			
			jQuery("#spanDoctor").append(Doctor);
			jQuery("#spanDoctor").find("table").eq(spanDoctor).find("a").attr("codeId",(spanDoctor+1));
			jQuery("#spanDoctor").find("table").eq(spanDoctor).find(".docPop").css("display","");
			jQuery("#spanDoctor").find("table").eq(spanDoctor).find("input[name='docSchlLctnNm']").attr("readonly","readonly");
			jQuery("#spanDoctor").find("table .check3").eq(spanDoctor).attr("index", spanDoctor);

			//졸업년도, 졸업구분 추가된 폼은 disabled해제
			jQuery("#spanDoctor").find("table").eq(spanDoctor).find("select[name='docGrdtYear']").removeAttr("disabled");
			jQuery("#spanDoctor").find("table").eq(spanDoctor).find("select[name='docGrdtMonth']").removeAttr("disabled");
			jQuery("#spanDoctor").find("table").eq(spanDoctor).find("select[name='docGrdtCd']").removeAttr("disabled");			
			
			jQuery("#spanDoctor").find("table").eq(spanDoctor).find("input, select").each(function(){
				var trgrId = jQuery(this).attr("id");
				var trgrTitle = jQuery(this).attr("title");
				
				if(typeof trgrId != "undefined")
				{
					jQuery(this).attr("id", trgrId.substring(0, trgrId.length-1)+(spanDoctor+1));
				}
				if(typeof trgrTitle != "undefined")
				{
					jQuery(this).attr("title", trgrTitle.substring(0, trgrTitle.length-1)+(spanDoctor+1));
				}
			});
			
			jQuery("form[name=frm]").append("<input type='hidden' name='docSeq' value='' />");
			
			spanDoctor++;
		}	
	});
  
	/**
	 * 
	 * 대학원 이벤트(박사) - 폼 제거
	 * 
	 * @date 2015. 08. 15.
	 * @author 안진용
	 * @example 
	 */	
	jQuery("#delDoctor").click(function(){
		var delSeq = jQuery("#spanDoctor").find("table").last().find("input[name='docSeq']").val();
		
		if(typeof delSeq != "undefined")
		{
			jQuery("form[name='frm']").append("<input type='hidden' name='docDelSeq' value='"+delSeq+"'>");
		}
		else
		{
			delSeq = jQuery("form[name='frm']").find("input[name='docSeq']").last().val();
			jQuery("form[name='frm']").append("<input type='hidden' name='docDelSeq' value='"+delSeq+"'>");
		}
		
		if(spanDoctor > 1)
		{		
			jQuery("#spanDoctor").find("table").last().remove();
			jQuery("#spanDoctor").find("table").eq(spanDoctor).find("a").attr("codeId",(spanDoctor-1));
			spanDoctor--;
		}
		else
		{
			if(LAST_LEDU_CD != "05")
			{
				jQuery("#spanDoctor").find("table").find("select").find("option:first").attr("selected","selected");
				jQuery("#spanDoctor").find("table").find("input").val("");				
			}
		}
	});	
});







/**
 * 
 * 기타 - 폼 추가
 * 
 * @date 2015. 08. 15.
 * @author 안진용
 * @example 
 */	  
jQuery(document).ready(function(){	
	var spanEtc = jQuery("#spanEtc").find("table").length;
	
	jQuery("#addEtc").click(function(){
		if(spanEtc >= 3)
		{
			alert("최대 3개까지 입력 가능합니다.");
		}
		else
		{
			var Etc = jQuery("#spanEtc").find("table").eq(0).clone(true);
			//Etc.css("border-top","1px solid #555");
			Etc.find("input").val("");
			Etc.find("input").removeClass();
			
			Etc.find("select").find("option:first").attr("selected","selected");
			
			jQuery("#spanEtc").append(Etc);
			jQuery("#spanEtc").find("table").eq(spanEtc).find("input[name='etcSchlCd']").val('99');
			
			//졸업년도, 졸업구분 추가된 폼은 disabled해제
			jQuery("#spanEtc").find("table").eq(spanEtc).find("select[name='etcGrdtYear']").removeAttr("disabled");
			jQuery("#spanEtc").find("table").eq(spanEtc).find("select[name='etcGrdtMonth']").removeAttr("disabled");
			
			jQuery("#spanEtc").find("table").eq(spanEtc).find("input, select").each(function(){
				var trgrId = jQuery(this).attr("id");
				var trgrTitle = jQuery(this).attr("title");
				
				if(typeof trgrId != "undefined")
				{
					jQuery(this).attr("id", trgrId.substring(0, trgrId.length-1)+(spanEtc+1));
				}
				if(typeof trgrTitle != "undefined")
				{
					jQuery(this).attr("title", trgrTitle.substring(0, trgrTitle.length-1)+(spanEtc+1));
				}
			});
			
			jQuery("form[name=frm]").append("<input type='hidden' name='etcSeq' value=''/>");
			
			spanEtc++;
		}	
	});
	
	/**
	 * 
	 * 대학원 이벤트(기타) - 폼 제거
	 * 
	 * @date 2015. 08. 15.
	 * @author 안진용
	 * @example 
	 */	
	jQuery("#delEtc").click(function(){
		var delSeq = jQuery("#spanEtc").find("table").last().find("input[name='etcSeq']").val();
		
		if(typeof delSeq != "undefined")
		{
			jQuery("form[name='frm']").append("<input type='hidden' name='etcDelSeq' value='"+delSeq+"'>");
		}
		else
		{
			delSeq = jQuery("form[name='frm']").find("input[name='etcSeq']").last().val();
			jQuery("form[name='frm']").append("<input type='hidden' name='etcDelSeq' value='"+delSeq+"'>");
		}
		
		if(spanEtc > 1)
		{		
			jQuery("#spanEtc").find("table").last().remove();
			spanEtc--;
		}
		else
		{
			if(LAST_LEDU_CD != "99")
			{
				jQuery("#spanEtc").find("table").find("select").find("option:first").attr("selected","selected");
				jQuery("#spanEtc").find("table").find("input").val("");				
			}
		}
	});	
});






  /**
   * 
   * 학교별 만점기준 도움말 이벤트
   * 
   * @date 2015. 08. 15.
   * @author 안진용
   * @example 
   */
function hover(spanId, num){
	jQuery(spanId).find("table .checkTxt.type3").eq(num).stop().fadeIn(0, function(){
		jQuery(spanId).find("table .checkTxt.type3").eq(num).stop().animate({top : 0, opacity : 1}, 150);
	});
}
function unhover(spanId, num){
	jQuery(spanId).find("table .checkTxt.type3").eq(num).stop().fadeOut(0, function(){
		jQuery("table .checkTxt.type3").eq(num).stop().animate({top : -4, opacity : 0}, 150);
	});

}


				
  /**
   * 
   * 학교찾기 팝업
   * 
   * @date 2015. 08. 15.
   * @author 안진용
   * @example 
   */
function schlPopUp(code, menuNum, gubun){
	var f = document.popFrm;
	f.leduCd.value=code;
	f.menuNum.value=menuNum;
	f.gubun.value=gubun;
	window.open("","schlSearchPop","width=670, height=690, menubar=no,status=yes,scrollbars=no");
	f.action = "./schlSearchPop.nhd";
	f.target = "schlSearchPop";
	f.submit();		
}

				
/**
 * 대학 선택 결과 적용
 * 
 * @date 2015.08.15
 * @author 안진용
 * @example 
 */
function addSchl(schlCd, schlNm, schlDsc, scgubun, menuNum, gubun) {
	if(schlCd=="9999")
	{
		if(schlCd==""||schlNm=="")
		{
			alert("잠시 후 다시 시도하여 주십시오.");
			return;			
		}
	}
	else
	{
		if(schlCd==""||schlNm==""||schlDsc=="")
		{
			alert("잠시 후 다시 시도하여 주십시오.");
			return;
		}		
	}
	//고등학교
	if(scgubun=="01")
	{
		jQuery("input[name='highSchlCd']").val(schlCd);
		jQuery("input[name='highSchlNm']").val(schlNm);
		jQuery("input[name='highSchlLctnNm']").val(schlDsc);
		
		//학교를 직접입력했다면,
		if(schlCd=="9999")
		{
			jQuery("input[name='highSchlLctnNm']").removeAttr("readonly","readonly");
			jQuery("input[name='highSchlLctnNm']").removeAttr("disabled");
			jQuery("input[name='highSchlLctnNm']").focus();
		}
		else
		{
			jQuery("input[name='highSchlLctnNm']").prop({readonly : true, disabled : true});
		}
	}
	//전문대
	if(scgubun=="02")
	{
		jQuery("#spanColl").find("table").eq(menuNum-1).find("input[name='collSchlCd']").val(schlCd);
		jQuery("#spanColl").find("table").eq(menuNum-1).find("input[name='collSchlNm']").val(schlNm);
		jQuery("#spanColl").find("table").eq(menuNum-1).find("input[name='collSchlLctnNm']").val(schlDsc);			
		
		if(schlCd=="9999")
		{
			jQuery("#spanColl").find("table").eq(menuNum-1).find("input[name='collSchlLctnNm']").removeAttr("readonly","readonly");
			jQuery("#spanColl").find("table").eq(menuNum-1).find("input[name='collSchlLctnNm']").removeAttr("disabled");
			jQuery("#spanColl").find("table").eq(menuNum-1).find("input[name='collSchlLctnNm']").focus();
		}
		else
		{
			jQuery("#spanColl").find("table").eq(menuNum-1).find("input[name='collSchlLctnNm']").prop({readonly : true, disabled : true});
		}
	}
	
	//대학교
	if(scgubun=="03")
	{
		//입학학교
		if(gubun=="univMtrcSchlNm")
		{
			jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univMtrcSchlCd']").val(schlCd);
			jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univMtrcSchlNm']").val(schlNm);
			jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univMtrcSchlLctnNm']").val(schlDsc);				

			if(schlCd=="9999")
			{
				jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univMtrcSchlLctnNm']").removeAttr("readonly","readonly");
				jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univMtrcSchlLctnNm']").removeAttr("disabled");
				jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univMtrcSchlLctnNm']").focus();
			}
			else
			{
				jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univMtrcSchlLctnNm']").prop({readonly : true, disabled : true});
			}
		}
		//졸업학교
		else if(gubun=="univSchlNm")
		{
			jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univSchlCd']").val(schlCd);
			jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univSchlNm']").val(schlNm);
			jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univSchlLctnNm']").val(schlDsc);

			if(schlCd=="9999")
			{
				jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univSchlLctnNm']").removeAttr("readonly","readonly");
				jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univSchlLctnNm']").removeAttr("disabled");
				jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univSchlLctnNm']").focus();
			}
			else
			{
				jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univSchlLctnNm']").prop({readonly : true, disabled : true});
			}
		}
	}
	//대학원(석사)
	if(scgubun=="04")
	{
		jQuery("#spanMaster").find("table").eq(menuNum-1).find("input[name='masSchlCd']").val(schlCd);
		jQuery("#spanMaster").find("table").eq(menuNum-1).find("input[name='masSchlNm']").val(schlNm);
		jQuery("#spanMaster").find("table").eq(menuNum-1).find("input[name='masSchlLctnNm']").val(schlDsc);
		
		if(schlCd=="9999")
		{
			jQuery("#spanMaster").find("table").eq(menuNum-1).find("input[name='masSchlLctnNm']").removeAttr("readonly","readonly");
			jQuery("#spanMaster").find("table").eq(menuNum-1).find("input[name='masSchlLctnNm']").removeAttr("disabled");
			jQuery("#spanMaster").find("table").eq(menuNum-1).find("input[name='masSchlLctnNm']").focus();
		}
		else
		{
			jQuery("#spanMaster").find("table").eq(menuNum-1).find("input[name='univMtrcSchlNm']").prop({readonly : true, disabled : true});
		}
	}
	//대학원(박사)
	if(scgubun=="05")
	{
		jQuery("#spanDoctor").find("table").eq(menuNum-1).find("input[name='docSchlCd']").val(schlCd);
		jQuery("#spanDoctor").find("table").eq(menuNum-1).find("input[name='docSchlNm']").val(schlNm);
		jQuery("#spanDoctor").find("table").eq(menuNum-1).find("input[name='docSchlLctnNm']").val(schlDsc);

		if(schlCd=="9999")
		{
			jQuery("#spanDoctor").find("table").eq(menuNum-1).find("input[name='docSchlLctnNm']").removeAttr("readonly","readonly");
			jQuery("#spanDoctor").find("table").eq(menuNum-1).find("input[name='docSchlLctnNm']").removeAttr("disabled");
			jQuery("#spanDoctor").find("table").eq(menuNum-1).find("input[name='docSchlLctnNm']").focus();
		}
		else
		{
			jQuery("#spanDoctor").find("table").eq(menuNum-1).find("input[name='docSchlLctnNm']").prop({readonly : true, disabled : true});
		}
	}	
}				


/**
 * 
 * 전공찾기 팝업
 * 
 * @date 2015. 08. 15.
 * @author 안진용
 * @example 
 */
function mjrPopUp(code, gubun, menuNum){
	var f = document.popFrm;
	f.leduCd.value=code;
	f.gubun.value=gubun;
	f.menuNum.value=menuNum;
	window.open("","mjrSearchPop","width=670, height=690, menubar=no,status=yes,scrollbars=no");
	f.action = "./mjrSearchPop.nhd";
	f.target = "mjrSearchPop";
	f.submit();
}

/**
 * 전공선택 결과 적용
 * 
 * @date 2015.08.15
 * @author 안진용
 * @example
 */
function addMjr(afltCd, afltNm, mjrCd, mjrNm, scgubun, gubun, menuNum) {
	if(afltCd==""||afltNm==""||mjrCd==""||mjrNm=="")
	{
		alert("잠시 후 다시 시도하여 주십시오.");
		return;		
	}
	
	//전문대학
	if(scgubun=="02")
	{
		//주전공
		if(gubun=='collMjrNm')
		{
			jQuery("#spanColl").find("table").eq(menuNum-1).find("input[name='collafltCd']").val(afltCd);
			jQuery("#spanColl").find("table").eq(menuNum-1).find("input[name='collafltNm']").val(afltNm);
			jQuery("#spanColl").find("table").eq(menuNum-1).find("input[name='collMjrCd']").val(mjrCd);
			jQuery("#spanColl").find("table").eq(menuNum-1).find("input[name='collMjrNm']").val(mjrNm);
		}
		//복수전공
		else if(gubun=="collDmjrNm")
		{
			jQuery("#spanColl").find("table").eq(menuNum-1).find("input[name='collgrdtDmjrAfltCd']").val(afltCd);
			jQuery("#spanColl").find("table").eq(menuNum-1).find("input[name='collgrdtDmjrAfltCdNm']").val(afltNm);
			jQuery("#spanColl").find("table").eq(menuNum-1).find("input[name='collDmjrCd']").val(mjrCd);
			jQuery("#spanColl").find("table").eq(menuNum-1).find("input[name='collDmjrNm']").val(mjrNm);				
		}
		//부전공
		else if(gubun=="collMnrNm")
		{
			jQuery("#spanColl").find("table").eq(menuNum-1).find("input[name='collgrdtMnrAfltCd']").val(afltCd);
			jQuery("#spanColl").find("table").eq(menuNum-1).find("input[name='collgrdtMnrAfltCdNm']").val(afltNm);
			jQuery("#spanColl").find("table").eq(menuNum-1).find("input[name='collMnrCd']").val(mjrCd);
			jQuery("#spanColl").find("table").eq(menuNum-1).find("input[name='collMnrNm']").val(mjrNm);				
		}		
	}
	//대학교
	if(scgubun=="03")
	{
		//입학 주전공
		if(gubun=='univMtrcSchlMjrNm')
		{
			jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univmtrcAfltCd']").val(afltCd);
			jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univmtrcAfltCdNm']").val(afltNm);
			jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univMtrcSchlMjrCd']").val(mjrCd);
			jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univMtrcSchlMjrNm']").val(mjrNm);
		}
		//졸업 주전공
		else if(gubun=='univMjrNm')
		{
			jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univafltCd']").val(afltCd);
			jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univafltNm']").val(afltNm);
			jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univMjrCd']").val(mjrCd);
			jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univMjrNm']").val(mjrNm);
		}		
		//졸업 복수전공
		else if(gubun=="univDmjrNm")
		{
			jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univgrdtDmjrAfltCd']").val(afltCd);
			jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univgrdtDmjrAfltCdNm']").val(afltNm);
			jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univDmjrCd']").val(mjrCd);
			jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univDmjrNm']").val(mjrNm);				
		}
		//졸업 부전공
		else if(gubun=="univMnrNm")
		{
			jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univgrdtMnrAfltCd']").val(afltCd);
			jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univgrdtMnrAfltCdNm']").val(afltNm);
			jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univMnrCd']").val(mjrCd);
			jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univMnrNm']").val(mjrNm);				
		}		
	}
	//대학원(석사)
	if(scgubun=="04")
	{
		//주전공
		if(gubun=='masMjrNm')
		{
			jQuery("#spanMaster").find("table").eq(menuNum-1).find("input[name='masafltCd']").val(afltCd);
			jQuery("#spanMaster").find("table").eq(menuNum-1).find("input[name='masafltNm']").val(afltNm);
			jQuery("#spanMaster").find("table").eq(menuNum-1).find("input[name='masMjrCd']").val(mjrCd);
			jQuery("#spanMaster").find("table").eq(menuNum-1).find("input[name='masMjrNm']").val(mjrNm);
		}
		//복수전공
		else if(gubun=="masDmjrNm")
		{
			jQuery("#spanMaster").find("table").eq(menuNum-1).find("input[name='masgrdtDmjrAfltCd']").val(afltCd);
			jQuery("#spanMaster").find("table").eq(menuNum-1).find("input[name='masgrdtDmjrAfltCdNm']").val(afltNm);
			jQuery("#spanMaster").find("table").eq(menuNum-1).find("input[name='masDmjrCd']").val(mjrCd);
			jQuery("#spanMaster").find("table").eq(menuNum-1).find("input[name='masDmjrNm']").val(mjrNm);				
		}
		//부전공
		else if(gubun=="masMnrNm")
		{
			jQuery("#spanMaster").find("table").eq(menuNum-1).find("input[name='masgrdtMnrAfltCd']").val(afltCd);
			jQuery("#spanMaster").find("table").eq(menuNum-1).find("input[name='masgrdtMnrAfltCdNm']").val(afltNm);
			jQuery("#spanMaster").find("table").eq(menuNum-1).find("input[name='masMnrCd']").val(mjrCd);
			jQuery("#spanMaster").find("table").eq(menuNum-1).find("input[name='masMnrNm']").val(mjrNm);				
		}		
	}
	//대학원(박사)
	if(scgubun=="05")
	{
		//주전공
		if(gubun=='docMjrNm')
		{
			jQuery("#spanDoctor").find("table").eq(menuNum-1).find("input[name='docafltCd']").val(afltCd);
			jQuery("#spanDoctor").find("table").eq(menuNum-1).find("input[name='docafltNm']").val(afltNm);
			jQuery("#spanDoctor").find("table").eq(menuNum-1).find("input[name='docMjrCd']").val(mjrCd);
			jQuery("#spanDoctor").find("table").eq(menuNum-1).find("input[name='docMjrNm']").val(mjrNm);
		}
		//복수전공
		else if(gubun=="docDmjrNm")
		{
			jQuery("#spanDoctor").find("table").eq(menuNum-1).find("input[name='docGrdtDmjrAfltCd']").val(afltCd);
			jQuery("#spanDoctor").find("table").eq(menuNum-1).find("input[name='docGrdtDmjrAfltCdNm']").val(afltNm);
			jQuery("#spanDoctor").find("table").eq(menuNum-1).find("input[name='docDmjrCd']").val(mjrCd);
			jQuery("#spanDoctor").find("table").eq(menuNum-1).find("input[name='docDmjrNm']").val(mjrNm);				
		}
		//부전공
		else if(gubun=="docMnrNm")
		{
			jQuery("#spanDoctor").find("table").eq(menuNum-1).find("input[name='docGrdtMnrAfltCd']").val(afltCd);
			jQuery("#spanDoctor").find("table").eq(menuNum-1).find("input[name='docGrdtMnrAfltCdNm']").val(afltNm);
			jQuery("#spanDoctor").find("table").eq(menuNum-1).find("input[name='docMnrCd']").val(mjrCd);
			jQuery("#spanDoctor").find("table").eq(menuNum-1).find("input[name='docMnrNm']").val(mjrNm);				
		}		
	}	
}


/**
 * 
 * 입력한 정보를 자동저장한다.
 * 
 * @date 2015. 08. 12.
 * @author 안진용
 * @example 
 */
var init = setInterval(function(){
	AutoSave();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
},300000);

function AutoSave(){
	var chkbool = AutoFormChk();
	if(chkbool){
		
		//폼 전송전 disabled 요소제거
		jQuery("form[name='frm']").find("input").removeAttr("disabled");
		jQuery("form[name='frm']").find("select").removeAttr("disabled");
		
		//고등학교 입학,졸업 년,월일 입력
		var highMtrcYear = jQuery("#highMtrcYear").val();
		var highMtrcMonth = jQuery("#highMtrcMonth").val();
		var highGrdtYear = jQuery("#highGrdtYear").val();
		var highGrdtMonth = jQuery("#highGrdtMonth").val();
		
		jQuery("input[name='highMtrcYm']").val(highMtrcYear+highMtrcMonth);
		jQuery("input[name='highGrdtYm']").val(highGrdtYear+highGrdtMonth);
		
		//학교구분코드
		var highLeduGbCd = jQuery("input[name='highLeduGbCd']").val();
		if(highLeduGbCd==""){
			jQuery("input[name='highLeduGbCd']").val("01");
		}
		//전문대학 입학,졸업 년,월 입력
		jQuery("select[name='collMtrcYear']").each(function(e){
			jQuery("input[name='collMtrcYm']").eq(e).val(jQuery("select[name='collMtrcYear']").eq(e).val()+jQuery("select[name='collMtrcMonth']").eq(e).val());
			jQuery("input[name='collGrdtYm']").eq(e).val(jQuery("select[name='collGrdtYear']").eq(e).val()+jQuery("select[name='collGrdtMonth']").eq(e).val());
		});
		//대학교 입학 년,월 입력
		jQuery("select[name='univMtrcYear']").each(function(e){
			jQuery("input[name='univMtrcYm']").eq(e).val(jQuery("select[name='univMtrcYear']").eq(e).val()+jQuery("select[name='univMtrcMonth']").eq(e).val());
			jQuery("input[name='univGrdtYm']").eq(e).val(jQuery("select[name='univGrdtYear']").eq(e).val()+jQuery("select[name='univGrdtMonth']").eq(e).val());
			
		});
		//대학원(석사) 입학 년,월 입력
		jQuery("select[name='masMtrcYear']").each(function(e){
			jQuery("input[name='masMtrcYm']").eq(e).val(jQuery("select[name='masMtrcYear']").eq(e).val()+jQuery("select[name='masMtrcMonth']").eq(e).val());
			jQuery("input[name='masGrdtYm']").eq(e).val(jQuery("select[name='masGrdtYear']").eq(e).val()+jQuery("select[name='masGrdtMonth']").eq(e).val());		
		});
		//대학원(박사) 입학 년,월 입력
		jQuery("select[name='docMtrcYear']").each(function(e){
			jQuery("input[name='docMtrcYm']").eq(e).val(jQuery("select[name='docMtrcYear']").eq(e).val()+jQuery("select[name='docMtrcMonth']").eq(e).val());
			jQuery("input[name='docGrdtYm']").eq(e).val(jQuery("select[name='docGrdtYear']").eq(e).val()+jQuery("select[name='docGrdtMonth']").eq(e).val());		
		});
		//기타 입학 년,월 입력
		jQuery("select[name='etcMtrcYear']").each(function(e){
			jQuery("input[name='etcMtrcYm']").eq(e).val(jQuery("select[name='etcMtrcYear']").eq(e).val()+jQuery("select[name='etcMtrcMonth']").eq(e).val());
			jQuery("input[name='etcGrdtYm']").eq(e).val(jQuery("select[name='etcGrdtYear']").eq(e).val()+jQuery("select[name='etcGrdtMonth']").eq(e).val());		
		});	
		
		clearInterval(init);
		var queryString = jQuery("form[name=frm]").serialize();
		jQuery.ajax({
			type : "POST",
			url : "/recruit-info/company-application/apply/level-of-education/autosave.hd",
			dataType: "json",
			data:queryString,
			success:function(data){
				jQuery("input[name='collseq']").remove();
				jQuery("input[name='univSeq']").remove();
				jQuery("input[name='masSeq']").remove();
				jQuery("input[name='docSeq']").remove();
				jQuery("input[name='etcSeq']").remove();
				
				jQuery("form[name=frm]").append(data);
				
				//전문대
				var collseq = jQuery("input[name='collseq']").length;
				var collDiv = jQuery("#collDiv").find("table").length;				
				if(collDiv>collseq){
					for(var i=collseq; i<collDiv; i++){
						jQuery("form[name=frm]").append("<input type='hidden' name='collseq' value=''/>");
					}						
				}				
				//대학교
				var univSeq = jQuery("input[name='univSeq']").length;
				var univDiv = jQuery("#univDiv").find("table").length;				
				if(univDiv>univSeq){
					for(var i=univSeq; i<univDiv; i++){
						jQuery("form[name=frm]").append("<input type='hidden' name='univSeq' value=''/>");
					}						
				}				
				//대학원(석사)
				var masSeq = jQuery("input[name='masSeq']").length;
				var masDiv = jQuery("#masDiv").find("table").length;				
				if(masDiv>masSeq){
					for(var i=masSeq; i<masDiv; i++){
						jQuery("form[name=frm]").append("<input type='hidden' name='masSeq' value=''/>");
					}						
				}				
				//대학원(박사)
				var docSeq = jQuery("input[name='docSeq']").length;
				var docDiv = jQuery("#docDiv").find("table").length;				
				if(docDiv>docSeq){
					for(var i=docSeq; i<docDiv; i++){
						jQuery("form[name=frm]").append("<input type='hidden' name='docSeq' value=''/>");
					}						
				}				
				//기타학교
				var etcSeq = jQuery("input[name='etcSeq']").length;
				var etcDiv = jQuery("#etcDiv").find("table").length;				
				if(etcDiv>docSeq){
					for(var i=etcSeq; i<etcDiv; i++){
						jQuery("form[name=frm]").append("<input type='hidden' name='etcSeq' value=''/>");
					}						
				}
				//고등학교
				if(jQuery("input[name='highseq']").length>0){
					jQuery("input[name='highseq']").remove();
				}
				
				
			},
			error:function(event)
			{				
				//alert("잠시후 다시 시도 바랍니다.");
			}
		});			
	}	
}


/**
 * 
 * 자동 저장 전 유효성 검사실행
 * 
 * @date 2015. 08. 15.
 * @author 안진용
 * @example 
 */
function AutoFormChk(){
	var isbool=true;
	
	//고등학교(검정고시 합격 체크했을때)
	if(jQuery("input:checkbox[name='highGedYn']").is(":checked")){
		if(jQuery("select[name='highGrdtYear']").val()==""){
			isbool=false;
		}else if(jQuery("select[name='highGrdtMonth']").val()==""){
			isbool=false;			
		}
	}
	//고등학교(검정고시 합격 해제했을때)
	else
	{
		var highMtrcYear = jQuery("select[name='highMtrcYear']").val();
		var highMtrcMonth = jQuery("select[name='highMtrcMonth']").val();
		var highGrdtYear = jQuery("select[name='highGrdtYear']").val();
		var highGrdtMonth = jQuery("select[name='highGrdtMonth']").val();

		var startdate = highMtrcYear+highMtrcMonth;
		var enddate = highGrdtYear+highGrdtMonth;
		
		if(highMtrcYear==""){
			isbool=false;
		}else if(highMtrcMonth==""){
			isbool=false;			
		}else if(jQuery("input[name='highSchlNm']").val()==""){
			isbool=false;
		}else if(jQuery("select[name='highdyntCd']").val()==""){
			isbool=false;
		}else if(jQuery("select[name='highGrdtCd']").val()==""){
			isbool=false;
		}else if(jQuery("select[name='highGrdtCd']").val()!=""){
			if(highGrdtYear==""){
				isbool=false;
				return;
			}else if(highGrdtMonth==""){
				isbool=false;
				return;
			}else if(startdate>enddate){
				isbool=false;
				return;
			}
		}
	}		


	//사용자 최종학력코드
	var LAST_LEDU_CD = jQuery("input[name='LAST_LEDU_CD']").val();
	if(LAST_LEDU_CD=="02")
	{
		jQuery("#spanColl").find("table").each(function(){
			var collMtrcYear = jQuery(this).find("select[name='collMtrcYear']").val();
			var collMtrcMonth = jQuery(this).find("select[name='collMtrcMonth']").val();
			var collGrdtYear = jQuery(this).find("select[name='collGrdtYear']").val();
			var collGrdtMonth = jQuery(this).find("select[name='collGrdtMonth']").val();
			
			var startDate = collMtrcYear+collMtrcMonth;
			var endDate = collGrdtYear+collGrdtMonth;

			//졸업년도 중복체크
			var DuplieDate1 = jQuery("#spanColl").find("table").eq(0).find("select[name='collGrdtYear']").val()+jQuery("#spanColl").find("table").eq(0).find("select[name='collGrdtMonth']").val();
			var DuplieDate2 = jQuery("#spanColl").find("table").eq(1).find("select[name='collGrdtYear']").val()+jQuery("#spanColl").find("table").eq(1).find("select[name='collGrdtMonth']").val();
			var DuplieDate3 = jQuery("#spanColl").find("table").eq(2).find("select[name='collGrdtYear']").val()+jQuery("#spanColl").find("table").eq(2).find("select[name='collGrdtMonth']").val();
						
			if(jQuery(this).find("select[name='collMtrcYear']").val()==""){
				isbool=false;
			}else if(jQuery(this).find("select[name='collMtrcMonth']").val()==""){
				isbool=false;				
			}else if(jQuery(this).find("input[name='collSchlLctnNm']").val()==""){
				isbool=false;				
			}else if(jQuery(this).find("select[name='collGrdtCd']").val()==""){
				isbool=false;				
			}else if(jQuery(this).find("select[name='collGrdtCd']").val()!=""){
				if(jQuery(this).find("select[name='collGrdtCd']").val()!="01"&&jQuery(this).find("select[name='collGrdtCd']").val()!="02"&&jQuery(this).find("select[name='collGrdtCd']").val()!="99")
				{
					if(jQuery(this).find("select[name='collGrdtYear']").val()==""){
						isbool=false;
						return false;
					}else if(jQuery(this).find("select[name='collGrdtMonth']").val()==""){
						isbool=false;
						return false;
					}else if(jQuery(this).find("select[name='collMtrcYear']").val()+jQuery(this).find("select[name='collMtrcMonth']").val()>jQuery(this).find("select[name='collGrdtYear']").val()+jQuery(this).find("select[name='collGrdtMonth']").val()){
						isbool=false;				
					}						
				}
			}
			
			if(DuplieDate1==DuplieDate2){
				isbool=false;
			}else if(DuplieDate1==DuplieDate3){
				isbool=false;
			}else if(DuplieDate2==DuplieDate3){
				isbool=false;
			}else if(jQuery(this).find("input[name='collSchlNm']").val()==""){
				isbool=false;				
			}else if(jQuery(this).find("select[name='colldyntCd']").val()==""){
				isbool=false;				
			}else if(jQuery(this).find("input[name='collMjrNm']").val()==""){
				isbool=false;				
			}
		});
	}
	else
	{
		//대학교
		if(LAST_LEDU_CD=="03")
		{
			jQuery("#spanUniv").find("table").each(function(){
				var univMtrcYear = jQuery("select[name='univMtrcYear']").val();
				var univMtrcMonth = jQuery("select[name='univMtrcMonth']").val();
				var univGrdtYear = jQuery("select[name='univGrdtYear']").val();
				var univGrdtMonth = jQuery("select[name='univGrdtMonth']").val();
				
				var startDate = univMtrcYear+univMtrcMonth;
				var endDate = univGrdtYear+univGrdtMonth;

				//졸업년도 중복체크
				var DuplieDate1 = jQuery("#spanUniv").find("table").eq(0).find("select[name='univGrdtYear']").val()+jQuery("#spanUniv").find("table").eq(0).find("select[name='univGrdtMonth']").val();
				var DuplieDate2 = jQuery("#spanUniv").find("table").eq(1).find("select[name='univGrdtYear']").val()+jQuery("#spanUniv").find("table").eq(1).find("select[name='univGrdtMonth']").val();
				var DuplieDate3 = jQuery("#spanUniv").find("table").eq(2).find("select[name='univGrdtYear']").val()+jQuery("#spanUniv").find("table").eq(2).find("select[name='univGrdtMonth']").val();
				
				
				if(jQuery(this).find("input[name='univMtrcSchlNm']").val()==""){
					isbool=false;
				}else if(jQuery(this).find("select[name='univMtrcSchlDyntCd']").val()==""){
					isbool=false;
				}else if(jQuery(this).find("input[name='univMtrcSchlLctnNm']").val()==""){
					isbool=false;
				}else if(jQuery(this).find("select[name='univMtrcYear']").val()==""){
					isbool=false;
				}else if(jQuery(this).find("select[name='univMtrcMonth']").val()==""){
					isbool=false;
				}else if(jQuery("input[name='univMtrcSchlMjrNm']").val()==""){
					isbool=false;
				}else if(jQuery("input[name='univSchlNm']").val()==""){
					isbool=false;
				}else if(jQuery(this).find("select[name='univdyntCd']").val()==""){
					isbool=false;
				}else if(jQuery(this).find("input[name='univSchlLctnNm']").val()==""){
					isbool=false;
				}else if(jQuery(this).find("select[name='univGrdtCd']").val()==""){
					isbool=false;
				}else if(jQuery(this).find("select[name='univGrdtCd']").val()!=""){
					if(jQuery(this).find("select[name='univGrdtCd']").val()!="01"&&jQuery(this).find("select[name='univGrdtCd']").val()!="02"&&jQuery(this).find("select[name='univGrdtCd']").val()!="99")
					{
						if(jQuery(this).find("select[name='univGrdtYear']").val()==""){
							isbool=false;
						}else if(jQuery(this).find("select[name='univGrdtMonth']").val()==""){
							isbool=false;
						}else if(jQuery(this).find("select[name='univMtrcYear']").val()+jQuery(this).find("select[name='univMtrcMonth']").val()>jQuery(this).find("select[name='univGrdtYear']").val()+jQuery(this).find("select[name='univGrdtMonth']").val()){							
							isbool=false;
						}else if(jQuery(this).find("input[name='univRcd']").val()==""){
							isbool=false;
						}else if(jQuery(this).find("input[name='univRcd']").val()!=""){
							var univRcd = jQuery(this).find("input[name='univRcd']").val();
							if(Number(univRcd)>4.5){
								isbool=false;
							}
						}					
					}
				}
				
				if(DuplieDate1==DuplieDate2){
					isbool=false;
				}else if(DuplieDate1==DuplieDate3){
					isbool=false;
				}else if(DuplieDate2==DuplieDate3){
					isbool=false;
				}else if(jQuery("input[name='univMjrNm']").val()==""){
					isbool=false;
				}
			});				
		}
		else if(LAST_LEDU_CD=="04")
		{
			//대학원(석사)
			jQuery("#spanMaster").find("table").each(function(){
				var masMtrcYear = jQuery(this).find("select[name='masMtrcYear']").val();
				var masMtrcMonth = jQuery(this).find("select[name='masMtrcMonth']").val();
				var masGrdtYear = jQuery(this).find("select[name='masGrdtYear']").val();
				var masGrdtMonth = jQuery(this).find("select[name='masGrdtMonth']").val();
				
				var startDate = masMtrcYear+masMtrcMonth;
				var endDate = masGrdtYear+masGrdtMonth;

				//졸업년도 중복체크
				var DuplieDate1 = jQuery("#spanMaster").find("table").eq(0).find("select[name='masGrdtYear']").val()+jQuery("#spanMaster").find("table").eq(0).find("select[name='masGrdtMonth']").val();
				var DuplieDate2 = jQuery("#spanMaster").find("table").eq(1).find("select[name='masGrdtYear']").val()+jQuery("#spanMaster").find("table").eq(1).find("select[name='masGrdtMonth']").val();
				var DuplieDate3 = jQuery("#spanMaster").find("table").eq(2).find("select[name='masGrdtYear']").val()+jQuery("#spanMaster").find("table").eq(2).find("select[name='masGrdtMonth']").val();
							
				if(jQuery(this).find("select[name='masMtrcYear']").val()==""){
					isbool=false;
				}else if(jQuery(this).find("select[name='masMtrcMonth']").val()==""){
					isbool=false;			
				}else if(jQuery(this).find("select[name='masGrdtYear']").val()==""){
					isbool=false;			
				}else if(jQuery(this).find("select[name='masGrdtMonth']").val()==""){
					isbool=false;			
				}else if(startDate>endDate){
					isbool=false;			
				}else if(jQuery(this).find("select[name='masGrdtCd']").val()==""){
					isbool=false;			
				}else if(jQuery(this).find("select[name='masGrdtCd']").val()!=""){
					if(jQuery(this).find("select[name='masGrdtCd']").val()!="01"&&jQuery(this).find("select[name='masGrdtCd']").val()!="02"&&jQuery(this).find("select[name='masGrdtCd']").val()!="99")
					{
						if(jQuery(this).find("select[name='masGrdtYear']").val()==""){
							isbool=false;
						}else if(jQuery(this).find("select[name='masGrdtMonth']").val()==""){
							isbool=false;
						}else if(jQuery(this).find("select[name='masMtrcYear']").val()+jQuery(this).find("select[name='masMtrcMonth']").val()>jQuery(this).find("select[name='masGrdtYear']").val()+jQuery(this).find("select[name='masGrdtMonth']").val()){
							isbool=false;
						}else if(jQuery(this).find("input[name='masRcd']").val()==""){
							isbool=false;
						}else if(jQuery(this).find("input[name='masRcd']").val()!=""){
							var masRcd = jQuery(this).find("input[name='masRcd']").val();
							if(Number(masRcd)>4.5){
								isbool=false;
							}
						}
					}
				}
				
				if(DuplieDate1==DuplieDate2){
					isbool=false;
				}else if(DuplieDate1==DuplieDate3){
					isbool=false;
				}else if(DuplieDate2==DuplieDate3){
					isbool=false;
				}else if(jQuery(this).find("input[name='masSchlNm']").val()==""){
					isbool=false;
				}else if(jQuery(this).find("select[name='masdyntCd']").val()==""){
					isbool=false;
				}else if(jQuery(this).find("input[name='masSchlLctnNm']").val()==""){
					isbool=false;
				}else if(jQuery(this).find("input[name='masMjrNm']").val()==""){
					isbool=false;
				}else if(jQuery(this).find("input[name='masThssNm']").val()==""){
					isbool=false;
				}
			})		
		}
		else if(LAST_LEDU_CD=="05")
		{
			//대학원(박사)
			jQuery("#spanDoctor").find("table").each(function(){
				var docMtrcYear = jQuery(this).find("select[name='docMtrcYear']").val();
				var docMtrcMonth = jQuery(this).find("select[name='docMtrcMonth']").val();
				var docGrdtYear = jQuery(this).find("select[name='docGrdtYear']").val();
				var docGrdtMonth = jQuery(this).find("select[name='docGrdtMonth']").val();
				
				var startDate = docMtrcYear+docMtrcMonth;
				var endDate = docGrdtYear+docGrdtMonth;
				
				//졸업년도 중복체크
				var DuplieDate1 = jQuery("#spanDoctor").find("table").eq(0).find("select[name='docGrdtYear']").val()+jQuery("#spanDoctor").find("table").eq(0).find("select[name='docGrdtMonth']").val();
				var DuplieDate2 = jQuery("#spanDoctor").find("table").eq(1).find("select[name='docGrdtYear']").val()+jQuery("#spanDoctor").find("table").eq(1).find("select[name='docGrdtMonth']").val();
				var DuplieDate3 = jQuery("#spanDoctor").find("table").eq(2).find("select[name='docGrdtYear']").val()+jQuery("#spanDoctor").find("table").eq(2).find("select[name='docGrdtMonth']").val();
							
				if(jQuery(this).find("select[name='docMtrcYear']").val()==""){
					isbool=false;
				}else if(jQuery(this).find("select[name='docMtrcMonth']").val()==""){
					isbool=false;			
				}else if(jQuery(this).find("select[name='docGrdtCd']").val()==""){
					isbool=false;			
				}else if(jQuery(this).find("select[name='docGrdtCd']").val()!=""){
					if(jQuery(this).find("select[name='docGrdtCd']").val()!="01"&&jQuery(this).find("select[name='docGrdtCd']").val()!="02"&&jQuery(this).find("select[name='docGrdtCd']").val()!="99")
					{
						if(jQuery(this).find("select[name='docGrdtYear']").val()==""){
							isbool=false;
							return false;
						}else if(jQuery(this).find("select[name='docGrdtMonth']").val()==""){
							isbool=false;
							return false;
						}else if(jQuery(this).find("select[name='docMtrcYear']").val()+jQuery(this).find("select[name='docMtrcMonth']").val()>jQuery(this).find("select[name='docGrdtYear']").val()+jQuery(this).find("select[name='docGrdtMonth']").val()){
							isbool=false;
							return false;
						}else if(jQuery(this).find("input[name='docRcd']").val()==""){
							isbool=false;
							return false;
						}else if(jQuery(this).find("input[name='docRcd']").val()!=""){
							var docRcd = jQuery(this).find("input[name='docRcd']").val();
							if(Number(docRcd)>4.5){
								isbool=false;
								return false;
							}
						}
					}
				}
				
				if(DuplieDate1==DuplieDate2){
					isbool=false;
				}else if(DuplieDate1==DuplieDate3){
					isbool=false;
				}else if(DuplieDate2==DuplieDate3){
					isbool=false;
				}else if(jQuery(this).find("input[name='docSchlNm']").val()==""){
					isbool=false;
				}else if(jQuery(this).find("select[name='docdyntCd']").val()==""){
					isbool=false;
				}else if(jQuery(this).find("input[name='docSchlLctnNm']").val()==""){
					isbool=false;
				}else if(jQuery(this).find("input[name='docMjrNm']").val()==""){
					isbool=false;
				}else if(jQuery(this).find("input[name='docThssNm']").val()==""){
					isbool=false;
				}
			})		
		}	
	}
	return isbool;
}



/**
 * 
 * 저장폼 전송전 체크
 * 
 * @date 2015. 08. 15.
 * @author 안진용
 * @example 
 */
function frmSubmit(gubun, mode)
{
	var frm = document.frm;
	var isbool=true;
		
	//고등학교(검정고시 합격 체크했을때)
	if(jQuery("input:checkbox[name='highGedYn']").is(":checked")){
		if(jQuery("select[name='highGrdtYear']").val()==""){
			alert("졸업(합격)년도를 선택하여 주십시오.");
			jQuery("select[name='highGrdtYear']").focus();
			isbool=false;
			return;
		}else if(jQuery("select[name='highGrdtMonth']").val()==""){
			alert("졸업(합격)월을 선택하여 주십시오.");
			jQuery("select[name='highGrdtMonth']").focus();
			isbool=false;
			return;
		}
	}
	//고등학교(검정고시 합격 해제했을때)
	else
	{
		var highMtrcYear = jQuery("select[name='highMtrcYear']").val();
		var highMtrcMonth = jQuery("select[name='highMtrcMonth']").val();
		var highGrdtYear = jQuery("select[name='highGrdtYear']").val();
		var highGrdtMonth = jQuery("select[name='highGrdtMonth']").val();

		var startdate = highMtrcYear+highMtrcMonth;
		var enddate = highGrdtYear+highGrdtMonth;
		
		if(highMtrcYear==""){
			alert("입학년도를 선택하여 주십시오.");
			jQuery("select[name='highMtrcYear']").focus();
			isbool=false;
			return;
		}else if(highMtrcMonth==""){
			alert("입학월을 선택하여 주십시오.");
			jQuery("select[name='highMtrcMonth']").focus();
			isbool=false;			
			return;
		}else if(jQuery("input[name='highSchlNm']").val()==""){
			alert("학교명을 검색하여 주십시오.");
			jQuery("input[name='highSchlNm']").focus();
			isbool=false;
			return;
		}else if(jQuery("select[name='highdyntCd']").val()==""){
			alert("주/야간을 선택하여 주십시오.");
			jQuery("select[name='highdyntCd']").focus();
			isbool=false;
			return;
		}else if(jQuery("select[name='highGrdtCd']").val()==""){
			alert("졸업여부를 선택하여 주십시오.");
			jQuery("select[name='highGrdtCd']").focus();
			isbool=false;
			return;
		}else if(jQuery("select[name='highGrdtCd']").val()!=""){
			if(highGrdtYear==""){
				alert("졸업(합격)년도를 선택하여 주십시오.");
				jQuery("select[name='highGrdtYear']").focus();
				isbool=false;
				return;
			}else if(highGrdtMonth==""){
				alert("졸업(합격)월을 선택하여 주십시오.");
				jQuery("select[name='highGrdtMonth']").focus();
				isbool=false;
				return;
			}else if(startdate>enddate){
				alert("입학년도가 졸업년도보다 큽니다.");
				jQuery("select[name='highMtrcYear']").focus();
				isbool=false;
				return;
			}
		}
	}
	
	//사용자 최종학력코드
	var LAST_LEDU_CD = jQuery("input[name='LAST_LEDU_CD']").val();
	
	//전문대
	if(LAST_LEDU_CD=="02"){
		if(isbool){
			jQuery("#spanColl").find("table").each(function(){
				var collMtrcYear = jQuery(this).find("select[name='collMtrcYear']").val();
				var collMtrcMonth = jQuery(this).find("select[name='collMtrcMonth']").val();
				var collGrdtYear = jQuery(this).find("select[name='collGrdtYear']").val();
				var collGrdtMonth = jQuery(this).find("select[name='collGrdtMonth']").val();
				
				var startDate = collMtrcYear+collMtrcMonth;
				var endDate = collGrdtYear+collGrdtMonth;
				
				//졸업년도 중복체크
				var DuplieDate1 = jQuery("#spanColl").find("table").eq(0).find("select[name='collGrdtYear']").val()+jQuery("#spanColl").find("table").eq(0).find("select[name='collGrdtMonth']").val();
				var DuplieDate2 = jQuery("#spanColl").find("table").eq(1).find("select[name='collGrdtYear']").val()+jQuery("#spanColl").find("table").eq(1).find("select[name='collGrdtMonth']").val();
				var DuplieDate3 = jQuery("#spanColl").find("table").eq(2).find("select[name='collGrdtYear']").val()+jQuery("#spanColl").find("table").eq(2).find("select[name='collGrdtMonth']").val();
				

				if(jQuery(this).find("select[name='collMtrcYear']").val()==""){
					alert("입학년도를 선택하여 주십시오.");
					jQuery(this).find("select[name='collMtrcYear']").focus();
					isbool=false;
					return false;
				}else if(jQuery(this).find("select[name='collMtrcMonth']").val()==""){
					alert("입학월을 선택하여 주십시오.");
					jQuery(this).find("select[name='collMtrcMonth']").focus();
					isbool=false;
					return false;
				}else if(jQuery(this).find("select[name='collGrdtCd']").val()==""){
					alert("졸업구분을 선택하여 주십시오.");
					jQuery(this).find("select[name='collGrdtCd']").focus();
					isbool=false;
					return false;
				}else if(jQuery(this).find("select[name='collGrdtCd']").val()!=""){
					if(jQuery(this).find("select[name='collGrdtCd']").val()!="01"&&jQuery(this).find("select[name='collGrdtCd']").val()!="02"&&jQuery(this).find("select[name='collGrdtCd']").val()!="99")
					{
						if(jQuery(this).find("select[name='collGrdtYear']").val()==""){
							alert("졸업년도를 선택하여 주십시오.");
							jQuery(this).find("select[name='collGrdtYear']").focus();
							isbool=false;
							return false;
						}else if(jQuery(this).find("select[name='collGrdtMonth']").val()==""){
							alert("졸업월을 선택하여 주십시오.");
							jQuery(this).find("select[name='collGrdtMonth']").focus();
							isbool=false;
							return false;
						}else if(jQuery(this).find("select[name='collMtrcYear']").val()+jQuery(this).find("select[name='collMtrcMonth']").val()>jQuery(this).find("select[name='collGrdtYear']").val()+jQuery(this).find("select[name='collGrdtMonth']").val()){
							alert("입학년도가 졸업년도보다 큽니다.");
							jQuery(this).find("select[name='collMtrcYear']").focus();
							isbool=false;				
						}else if(jQuery(this).find("input[name='collRcd']").val()==""){
							alert("학점을 입력하여 주십시오.");
							jQuery(this).find("input[name='collRcd']").focus();
							isbool=false;
							return false;
						}else if(jQuery(this).find("input[name='collRcd']").val()!=""){
							var collRcd = jQuery(this).find("input[name='collRcd']").val();
							if(Number(collRcd)>4.5){
								alert("입력하신 학점이 만점기준 학점보다 높습니다.");
								jQuery(this).find("input[name='collRcd']").focus();
								isbool=false;
								return false;
							}
						}				
					}
				}
				
				if(DuplieDate1==DuplieDate2){
					alert("졸업년도가 중복되었습니다.");
					isbool=false;
					return false;
				}else if(DuplieDate1==DuplieDate3){
					alert("졸업년도가 중복되었습니다.");
					isbool=false;
					return false;
				}else if(DuplieDate2==DuplieDate3){
					alert("졸업년도가 중복되었습니다.");
					isbool=false;
					return false;
				}else if(jQuery(this).find("input[name='collSchlNm']").val()==""){
					alert("학교명을 검색하여 주십시오.");
					jQuery(this).find("input[name='collSchlNm']").focus();
					isbool=false;
					return false;
				}else if(jQuery(this).find("select[name='colldyntCd']").val()==""){
					alert("주/야간을 선택하여 주십시오.");
					jQuery(this).find("select[name='colldyntCd']").focus();
					isbool=false;
					return false;
				}else if(jQuery(this).find("input[name='collSchlLctnNm']").val()==""){
					alert("소재지를 입력하여 주십시오.");
					jQuery(this).find("input[name='collSchlLctnNm']").focus();
					isbool=false;
					return false;
				}else if(jQuery(this).find("input[name='collMjrNm']").val()==""){
					alert("주전공을 검색하여 주십시오.");
					jQuery(this).find("input[name='collMjrNm']").focus();
					isbool=false;
					return false;
				}
			});			
		}
	}
	else
	{
		
		//최종학력이 전문대가 아닐때, 졸업년도만 중복체크
		var collDuplieDate1 = jQuery("#spanColl").find("table").eq(0).find("select[name='collGrdtYear']").val()+jQuery("#spanColl").find("table").eq(0).find("select[name='collGrdtMonth']").val();
		var collDuplieDate2 = jQuery("#spanColl").find("table").eq(1).find("select[name='collGrdtYear']").val()+jQuery("#spanColl").find("table").eq(1).find("select[name='collGrdtMonth']").val();
		var collDuplieDate3 = jQuery("#spanColl").find("table").eq(2).find("select[name='collGrdtYear']").val()+jQuery("#spanColl").find("table").eq(2).find("select[name='collGrdtMonth']").val();				

		if(collDuplieDate1==collDuplieDate2){
			alert("졸업년도가 중복되었습니다.");
			isbool=false;
			return;
		}else if(collDuplieDate1==collDuplieDate3){
			alert("졸업년도가 중복되었습니다.");
			isbool=false;
			return;
		}else if(collDuplieDate2==collDuplieDate3){
			alert("졸업년도가 중복되었습니다.");
			isbool=false;
			return;
		}		

		
		//대학교
		if(isbool){
			jQuery("#spanUniv").find("table").each(function(){
				var univMtrcYear = jQuery("select[name='univMtrcYear']").val();
				var univMtrcMonth = jQuery("select[name='univMtrcMonth']").val();
				var univGrdtYear = jQuery("select[name='univGrdtYear']").val();
				var univGrdtMonth = jQuery("select[name='univGrdtMonth']").val();
				
				var startDate = univMtrcYear+univMtrcMonth;
				var endDate = univGrdtYear+univGrdtMonth;
								
				//졸업년도 중복체크
				var DuplieDate1 = jQuery("#spanUniv").find("table").eq(0).find("select[name='univGrdtYear']").val()+jQuery("#spanUniv").find("table").eq(0).find("select[name='univGrdtMonth']").val();
				var DuplieDate2 = jQuery("#spanUniv").find("table").eq(1).find("select[name='univGrdtYear']").val()+jQuery("#spanUniv").find("table").eq(1).find("select[name='univGrdtMonth']").val();
				var DuplieDate3 = jQuery("#spanUniv").find("table").eq(2).find("select[name='univGrdtYear']").val()+jQuery("#spanUniv").find("table").eq(2).find("select[name='univGrdtMonth']").val();				

				
				if(jQuery(this).find("input[name='univMtrcSchlNm']").val()==""){
					alert("입학 학교명을 검색하여 주십시오.");
					jQuery(this).find("input[name='univMtrcSchlNm']").focus();
					isbool=false;
					return false;
				}else if(jQuery(this).find("select[name='univMtrcSchlDyntCd']").val()==""){
					alert("주/야간을 선택하여 주십시오.");
					jQuery(this).find("select[name='univMtrcSchlDyntCd']").focus();
					isbool=false;
					return false;
				}else if(jQuery(this).find("input[name='univMtrcSchlLctnNm']").val()==""){
					alert("소재지를 입력하여 주십시오.");
					jQuery(this).find("input[name='univMtrcSchlLctnNm']").focus();
					isbool=false;
					return false;
				}else if(jQuery(this).find("select[name='univMtrcYear']").val()==""){
					alert("입학년도를 선택하여 주십시오.");
					jQuery(this).find("select[name='univMtrcYear']").focus();
					isbool=false;
					return false;
				}else if(jQuery(this).find("select[name='univMtrcMonth']").val()==""){
					alert("입학월을 선택하여 주십시오.");
					jQuery(this).find("select[name='univMtrcMonth']").focus();
					isbool=false;
					return false;
				}else if(jQuery(this).find("input[name='univMtrcSchlMjrNm']").val()==""){
					alert("주전공을 검색하여 주십시오.");
					jQuery(this).find("input[name='univMtrcSchlMjrNm']").focus();
					isbool=false;
					return false;
				}else if(jQuery(this).find("input[name='univSchlNm']").val()==""){
					alert("졸업 학교명을 검색하여 주십시오.");
					jQuery(this).find("input[name='univSchlNm']").focus();
					isbool=false;
					return false;
				}else if(jQuery(this).find("select[name='univdyntCd']").val()==""){
					alert("주/야간을 선택하여 주십시오.");
					jQuery(this).find("select[name='univdyntCd']").focus();
					isbool=false;
					return false;
				}else if(jQuery(this).find("input[name='univSchlLctnNm']").val()==""){
					alert("소재지를 입력하여 주십시오.");
					jQuery(this).find("input[name='univSchlLctnNm']").focus();
					isbool=false;
					return false;
				}else if(jQuery(this).find("select[name='univGrdtCd']").val()==""){
					alert("졸업구분을 선택하여 주십시오.");
					jQuery(this).find("select[name='univGrdtCd']").focus();
					isbool=false;
					return false;
				}else if(jQuery(this).find("select[name='univGrdtCd']").val()!=""){
					//재학, 중퇴, 기타일때만 졸업년도 체크
					if(jQuery(this).find("select[name='univGrdtCd']").val()!="01"&&jQuery(this).find("select[name='univGrdtCd']").val()!="02"&&jQuery(this).find("select[name='univGrdtCd']").val()!="99")
					{
						if(jQuery(this).find("select[name='univGrdtYear']").val()==""){
							alert("졸업년도를 선택하여 주십시오.");
							jQuery(this).find("select[name='univGrdtYear']").focus();
							isbool=false;
							return false;
						}else if(jQuery(this).find("select[name='univGrdtMonth']").val()==""){
							alert("졸업월을 선택하여 주십시오.");
							jQuery(this).find("select[name='univGrdtMonth']").focus();
							isbool=false;
							return false;
						}else if(jQuery(this).find("select[name='univMtrcYear']").val()+jQuery(this).find("select[name='univMtrcMonth']").val()>jQuery(this).find("select[name='univGrdtYear']").val()+jQuery(this).find("select[name='univGrdtMonth']").val()){							
							alert("입학년도가 졸업년도보다 큽니다.");
							jQuery(this).find("select[name='univMtrcYear']").focus();
							isbool=false;
							return false;
						}else if(jQuery(this).find("input[name='univRcd']").val()==""){
							alert("학점을 입력하여 주십시오.");
							jQuery(this).find("input[name='univRcd']").focus();
							isbool=false;
							return false;
						}else if(jQuery(this).find("input[name='univRcd']").val()!=""){
							var univRcd = jQuery(this).find("input[name='univRcd']").val();
							if(Number(univRcd)>4.5){
								alert("입력하신 학점이 만점기준 학점보다 높습니다.");
								jQuery(this).find("input[name='univRcd']").focus();
								isbool=false;
								return false;
							}
						}		
					}
				}
				
				if(DuplieDate1==DuplieDate2){
					alert("졸업년도가 중복되었습니다.");
					isbool=false;
					return false;
				}else if(DuplieDate1==DuplieDate3){
					alert("졸업년도가 중복되었습니다.");
					isbool=false;
					return false;
				}else if(DuplieDate2==DuplieDate3){
					alert("졸업년도가 중복되었습니다.");
					isbool=false;
					return false;
				}else if(jQuery(this).find("input[name='univMjrNm']").val()==""){
					alert("주전공을 검색하여 주십시오.");
					jQuery(this).find("input[name='univMjrNm']").focus();
					isbool=false;
					return false;
				}
			});			
		}

		
		//대학원(석사)
		if(isbool){
			jQuery("#spanMaster").find("table").each(function(){
				var masMtrcYear = jQuery(this).find("select[name='masMtrcYear']").val();
				var masMtrcMonth = jQuery(this).find("select[name='masMtrcMonth']").val();
				var masGrdtYear = jQuery(this).find("select[name='masGrdtYear']").val();
				var masGrdtMonth = jQuery(this).find("select[name='masGrdtMonth']").val();
				
				var startDate = masMtrcYear+masMtrcMonth;
				var endDate = masGrdtYear+masGrdtMonth;

				//졸업년도 중복체크
				var DuplieDate1 = jQuery("#spanMaster").find("table").eq(0).find("select[name='masGrdtYear']").val()+jQuery("#spanMaster").find("table").eq(0).find("select[name='masGrdtMonth']").val();
				var DuplieDate2 = jQuery("#spanMaster").find("table").eq(1).find("select[name='masGrdtYear']").val()+jQuery("#spanMaster").find("table").eq(1).find("select[name='masGrdtMonth']").val();
				var DuplieDate3 = jQuery("#spanMaster").find("table").eq(2).find("select[name='masGrdtYear']").val()+jQuery("#spanMaster").find("table").eq(2).find("select[name='masGrdtMonth']").val();				
				
				if(jQuery(this).find("select[name='masMtrcYear']").val()==""){
					alert("입학년도를 선택하여 주십시오.");
					jQuery(this).find("select[name='masMtrcYear']").focus();
					isbool=false;
					return false;
				}else if(jQuery(this).find("select[name='masMtrcMonth']").val()==""){
					alert("입학월을 선택하여 주십시오.");
					jQuery(this).find("select[name='masMtrcMonth']").focus();
					isbool=false;
					return false;
				}else if(jQuery(this).find("select[name='masGrdtCd']").val()==""){
					alert("졸업구분을 선택하여 주십시오.");
					jQuery(this).find("select[name='masGrdtCd']").focus();
					isbool=false;
					return false;
				}else if(jQuery(this).find("select[name='masGrdtCd']").val()!=""){
					if(jQuery(this).find("select[name='masGrdtCd']").val()!="01"&&jQuery(this).find("select[name='masGrdtCd']").val()!="02"&&jQuery(this).find("select[name='masGrdtCd']").val()!="99")
					{
						if(jQuery(this).find("select[name='masGrdtYear']").val()==""){
							alert("졸업년도를 선택하여 주십시오.");
							jQuery(this).find("select[name='masGrdtYear']").focus();
							isbool=false;
							return false;
						}else if(jQuery(this).find("select[name='masGrdtMonth']").val()==""){
							alert("졸업월을 선택하여 주십시오.");
							jQuery(this).find("select[name='masGrdtMonth']").focus();
							isbool=false;
							return false;
						}else if(jQuery(this).find("select[name='masMtrcYear']").val()+jQuery(this).find("select[name='masMtrcMonth']").val()>jQuery(this).find("select[name='masGrdtYear']").val()+jQuery(this).find("select[name='masGrdtMonth']").val()){
							alert("입학년도가 졸업년도보다 큽니다.");
							jQuery(this).find("select[name='masMtrcYear']").focus();
							isbool=false;
							return false;
						}else if(jQuery(this).find("input[name='masRcd']").val()==""){
							alert("학점을 입력하여 주십시오.");
							jQuery(this).find("input[name='masRcd']").focus();
							isbool=false;
							return false;
						}else if(jQuery(this).find("input[name='masRcd']").val()!=""){
							var masRcd = jQuery(this).find("input[name='masRcd']").val();
							if(Number(masRcd)>4.5){
								alert("입력하신 학점이 만점기준 학점보다 높습니다.");
								jQuery(this).find("input[name='masRcd']").focus();
								isbool=false;
								return false;
							}
						}
					}
				}
				
				if(DuplieDate1==DuplieDate2){
					alert("졸업년도가 중복되었습니다.");
					isbool=false;
					return false;
				}else if(DuplieDate1==DuplieDate3){
					alert("졸업년도가 중복되었습니다.");
					isbool=false;
					return false;
				}else if(DuplieDate2==DuplieDate3){
					alert("졸업년도가 중복되었습니다.");
					isbool=false;
					return false;
				}else if(jQuery(this).find("input[name='masSchlNm']").val()==""){
					alert("학교명을 검색하여 주십시오.");
					jQuery(this).find("input[name='masSchlNm']").focus();
					isbool=false;
					return false;
				}else if(jQuery(this).find("select[name='masdyntCd']").val()==""){
					alert("주/야간을 선택하여 주십시오.");
					jQuery(this).find("select[name='masdyntCd']").focus();
					isbool=false;
					return false;
				}else if(jQuery(this).find("input[name='masSchlLctnNm']").val()==""){
					alert("소재지를 입력하여 주십시오.");
					jQuery(this).find("input[name='masSchlLctnNm']").focus();
					isbool=false;
					return false;
				}else if(jQuery(this).find("input[name='masMjrNm']").val()==""){
					alert("주전공명을 검색하여 주십시오.");
					jQuery(this).find("input[name='masMjrNm']").focus();
					isbool=false;
					return false;
				}else if(jQuery(this).find("input[name='masThssNm']").val()==""){
					alert("논문명을 입력하여 주십시오.");
					jQuery(this).find("input[name='masThssNm']").focus();
					isbool=false;
					return false;
				}
			})		
		}

		
		//대학원(박사)
		if(isbool){
			jQuery("#spanDoctor").find("table").each(function(){
				var docMtrcYear = jQuery(this).find("select[name='docMtrcYear']").val();
				var docMtrcMonth = jQuery(this).find("select[name='docMtrcMonth']").val();
				var docGrdtYear = jQuery(this).find("select[name='docGrdtYear']").val();
				var docGrdtMonth = jQuery(this).find("select[name='docGrdtMonth']").val();
				
				var startDate = docMtrcYear+docMtrcMonth;
				var endDate = docGrdtYear+docGrdtMonth;
				
				//졸업년도 중복체크
				var DuplieDate1 = jQuery("#spanDoctor").find("table").eq(0).find("select[name='docGrdtYear']").val()+jQuery("#spanDoctor").find("table").eq(0).find("select[name='docGrdtMonth']").val();
				var DuplieDate2 = jQuery("#spanDoctor").find("table").eq(1).find("select[name='docGrdtYear']").val()+jQuery("#spanDoctor").find("table").eq(1).find("select[name='docGrdtMonth']").val();
				var DuplieDate3 = jQuery("#spanDoctor").find("table").eq(2).find("select[name='docGrdtYear']").val()+jQuery("#spanDoctor").find("table").eq(2).find("select[name='docGrdtMonth']").val();

				if(jQuery(this).find("select[name='docMtrcYear']").val()==""){
					alert("입학년도를 선택하여 주십시오.");
					jQuery(this).find("select[name='docMtrcYear']").focus();
					isbool=false;
					return false;
				}else if(jQuery(this).find("select[name='docMtrcMonth']").val()==""){
					alert("입학월을 선택하여 주십시오.");
					jQuery(this).find("select[name='docMtrcMonth']").focus();
					isbool=false;
					return false;
				}else if(jQuery(this).find("select[name='docGrdtCd']").val()==""){
					alert("졸업구분을 선택하여 주십시오.");
					jQuery(this).find("select[name='docGrdtCd']").focus();
					isbool=false;
					return false;
				}else if(jQuery(this).find("select[name='docGrdtCd']").val()!=""){
					if(jQuery(this).find("select[name='docGrdtCd']").val()!="01"&&jQuery(this).find("select[name='docGrdtCd']").val()!="02"&&jQuery(this).find("select[name='docGrdtCd']").val()!="99")
					{
						if(jQuery(this).find("select[name='docGrdtYear']").val()==""){
							alert("졸업년도를 선택하여 주십시오.");
							jQuery(this).find("select[name='docGrdtYear']").focus();
							isbool=false;
							return false;
						}else if(jQuery(this).find("select[name='docGrdtMonth']").val()==""){
							alert("졸업월을 선택하여 주십시오.");
							jQuery(this).find("select[name='docGrdtMonth']").focus();
							isbool=false;
							return false;
						}else if(jQuery(this).find("select[name='docMtrcYear']").val()+jQuery(this).find("select[name='docMtrcMonth']").val()>jQuery(this).find("select[name='docGrdtYear']").val()+jQuery(this).find("select[name='docGrdtMonth']").val()){
							alert("입학년도가 졸업년도보다 큽니다.");
							jQuery(this).find("select[name='docMtrcYear']").focus();
							isbool=false;
							return false;
						}else if(jQuery(this).find("input[name='docRcd']").val()==""){
							alert("학점을 입력하여 주십시오.");
							jQuery(this).find("input[name='docRcd']").focus();
							isbool=false;
							return false;
						}else if(jQuery(this).find("input[name='docRcd']").val()!=""){
							var docRcd = jQuery(this).find("input[name='docRcd']").val();
							if(Number(docRcd)>4.5){
								alert("입력하신 학점이 만점기준 학점보다 높습니다.");
								jQuery(this).find("input[name='docRcd']").focus();
								isbool=false;
								return false;
							}
						}
					}
				}
				
				if(DuplieDate1==DuplieDate2){
					alert("졸업년도가 중복되었습니다.");
					isbool=false;
					return false;
				}else if(DuplieDate1==DuplieDate3){
					alert("졸업년도가 중복되었습니다.");
					isbool=false;
					return false;
				}else if(DuplieDate2==DuplieDate3){
					alert("졸업년도가 중복되었습니다.");
					isbool=false;
					return false;
				}else if(jQuery(this).find("input[name='docSchlNm']").val()==""){
					alert("학교명을 검색하여 주십시오.");
					jQuery(this).find("input[name='docSchlNm']").focus();
					isbool=false;
					return false;
				}else if(jQuery(this).find("select[name='docdyntCd']").val()==""){
					alert("주/야간을 선택하여 주십시오.");
					jQuery(this).find("select[name='docdyntCd']").focus();
					isbool=false;
					return false;
				}else if(jQuery(this).find("input[name='docSchlLctnNm']").val()==""){
					alert("소재지를 입력하여 주십시오.");
					jQuery(this).find("input[name='docSchlLctnNm']").focus();
					isbool=false;
					return false;
				}else if(jQuery(this).find("input[name='docMjrNm']").val()==""){
					alert("주전공명을 검색하여 주십시오.");
					jQuery(this).find("input[name='docMjrNm']").focus();
					isbool=false;
					return false;
				}else if(jQuery(this).find("input[name='docThssNm']").val()==""){
					alert("논문명을 입력하여 주십시오.");
					jQuery(this).find("input[name='docThssNm']").focus();
					isbool=false;
					return false;
				}
			})		
		}		
	}

	if(isbool)
	{
		//고등학교 입학,졸업 년,월일 입력
		var highMtrcYear = jQuery("#highMtrcYear").val();
		var highMtrcMonth = jQuery("#highMtrcMonth").val();
		var highGrdtYear = jQuery("#highGrdtYear").val();
		var highGrdtMonth = jQuery("#highGrdtMonth").val();
		
		jQuery("input[name='highMtrcYm']").val(highMtrcYear+highMtrcMonth);
		jQuery("input[name='highGrdtYm']").val(highGrdtYear+highGrdtMonth);
		
		//학교구분코드
		var highLeduGbCd = jQuery("input[name='highLeduGbCd']").val();
		if(highLeduGbCd==""){
			jQuery("input[name='highLeduGbCd']").val("01");
		}
		//전문대학 입학,졸업 년,월 입력
		jQuery("select[name='collMtrcYear']").each(function(e){
			jQuery("input[name='collMtrcYm']").eq(e).val(jQuery("select[name='collMtrcYear']").eq(e).val()+jQuery("select[name='collMtrcMonth']").eq(e).val());
			jQuery("input[name='collGrdtYm']").eq(e).val(jQuery("select[name='collGrdtYear']").eq(e).val()+jQuery("select[name='collGrdtMonth']").eq(e).val());
		});
		//대학교 입학 년,월 입력
		jQuery("select[name='univMtrcYear']").each(function(e){
			jQuery("input[name='univMtrcYm']").eq(e).val(jQuery("select[name='univMtrcYear']").eq(e).val()+jQuery("select[name='univMtrcMonth']").eq(e).val());
			jQuery("input[name='univGrdtYm']").eq(e).val(jQuery("select[name='univGrdtYear']").eq(e).val()+jQuery("select[name='univGrdtMonth']").eq(e).val());
			
		});
		//대학원(석사) 입학 년,월 입력
		jQuery("select[name='masMtrcYear']").each(function(e){
			jQuery("input[name='masMtrcYm']").eq(e).val(jQuery("select[name='masMtrcYear']").eq(e).val()+jQuery("select[name='masMtrcMonth']").eq(e).val());
			jQuery("input[name='masGrdtYm']").eq(e).val(jQuery("select[name='masGrdtYear']").eq(e).val()+jQuery("select[name='masGrdtMonth']").eq(e).val());		
		});
		//대학원(박사) 입학 년,월 입력
		jQuery("select[name='docMtrcYear']").each(function(e){
			jQuery("input[name='docMtrcYm']").eq(e).val(jQuery("select[name='docMtrcYear']").eq(e).val()+jQuery("select[name='docMtrcMonth']").eq(e).val());
			jQuery("input[name='docGrdtYm']").eq(e).val(jQuery("select[name='docGrdtYear']").eq(e).val()+jQuery("select[name='docGrdtMonth']").eq(e).val());		
		});
		//기타 입학 년,월 입력
		jQuery("select[name='etcMtrcYear']").each(function(e){
			jQuery("input[name='etcMtrcYm']").eq(e).val(jQuery("select[name='etcMtrcYear']").eq(e).val()+jQuery("select[name='etcMtrcMonth']").eq(e).val());
			jQuery("input[name='etcGrdtYm']").eq(e).val(jQuery("select[name='etcGrdtYear']").eq(e).val()+jQuery("select[name='etcGrdtMonth']").eq(e).val());		
		});
		
		if(gubun=="write")
		{
			if(confirm("입력한 정보로 저장하시겠습니까?")){
				//폼 전송전 disabled 요소제거
				jQuery("form[name='frm']").find("input").removeAttr("disabled");
				jQuery("form[name='frm']").find("select").removeAttr("disabled");
				frm.submit();			
			}			
		}
		else
		{
			//폼 전송전 disabled 요소제거
			jQuery("form[name='frm']").find("input").removeAttr("disabled");
			jQuery("form[name='frm']").find("select").removeAttr("disabled");			
			var queryString = jQuery("form[name=frm]").serialize();
			jQuery.ajax({
				type : "POST",
				url : "/recruit-info/company-application/apply/level-of-education/autosave.hd",
				dataType: "json",
				data:queryString,
				success:function(data){
					if(data=="true"){
						alert("저장되었습니다.");
						if(mode=="01"){
							location.href="/recruit-info/company-application/apply/personal/write.hd";
						}else if(mode=="02"){
							location.href="/recruit-info/company-application/apply/level-of-education/write.hd";
						}else if(mode=="03"){
							location.href="/recruit-info/company-application/apply/career-activity/write.hd";
						}else if(mode=="04"){
							location.href="/recruit-info/company-application/apply/license-ablity/write.hd";
						}else if(mode=="05"){
							location.href="/recruit-info/company-application/apply/cover-letter/write.hd";
						}						
					}else{
						alert("채용공고에 대한 세션이 끊어졌습니다. ");
						location.href="/recruit-info/announcement/list.nhd";						
					}
				},
				error:function(event)
				{				
					//alert("잠시후 다시 시도 바랍니다.");
				}
			});		
		}
	}	
}

/**
 * 지원서작성 복수(이중)전공 / 부전공 삭제  2016.05.16 배창환 추가
 * 
 * @date 2016.05.16
 * @author Bae, Chang Hwan
 * @example
 */
function delDmjrMnrForm(code, gubun, menuNum){
	/*    code              gubun          menuNum                  설명
	  02(전문대학)         collDelDmjr      Form순서         전문대학 복수(이중)전공 삭제
	  02(전문대학)         collDelDmjr      Form순서         전문대학 부전공 삭제
	  03(대학교)           univDelDmjr      Form순서         대학교 복수(이중)전공 삭제
	  03(대학교)           univDelMnr       Form순서         대학교 부전공 삭제
	  04(대학원_석사)       masDelDmjr      Form순서          대학원_석사 복수(이중전공) 삭제
	  04(대학원_석사)       masDelMnr       Form순서          대학원_석사 부전공 삭제
	  05(대학원_박사)       docDelDmjr      Form순서          대학원_박사 복수(이중전공) 삭제
	  05(대학원_박사)       docDelMnr       Form순서          대학원_박사 부전공 삭제
	  		
	*/
	if(code == "02" && gubun == "collDelDmjr") {	// 전문대학 복수(이중전공) 삭제버튼 클릭
		
		jQuery("#spanColl").find("table").eq(menuNum-1).find("input[name='collDmjrCd']").val('');
		jQuery("#spanColl").find("table").eq(menuNum-1).find("input[name='collDmjrNm']").val('');
		jQuery("#spanColl").find("table").eq(menuNum-1).find("input[name='collgrdtDmjrAfltCd']").val('');
		jQuery("#spanColl").find("table").eq(menuNum-1).find("input[name='collgrdtDmjrAfltCdNm']").val('');
	}
	else if(code == "02" && gubun == "collDelMnr") {	// 전문대학 부전공 삭제버튼 클릭
		
		jQuery("#spanColl").find("table").eq(menuNum-1).find("input[name='collMnrCd']").val('');
		jQuery("#spanColl").find("table").eq(menuNum-1).find("input[name='collMnrNm']").val('');
		jQuery("#spanColl").find("table").eq(menuNum-1).find("input[name='collgrdtMnrAfltCd']").val('');
		jQuery("#spanColl").find("table").eq(menuNum-1).find("input[name='collgrdtMnrAfltCdNm']").val('');
		
	}
	else if(code == "03" && gubun == "univDelDmjr") {	// 대학교 복수(이중전공) 삭제버튼 클릭		
		jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univDmjrCd']").val('');
		jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univDmjrNm']").val('');
		jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univgrdtDmjrAfltCd']").val('');
		jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univgrdtDmjrAfltCdNm']").val('');
		
	}
	else if(code == "03" && gubun == "univDelMnr") {	// 대학교 부전공 삭제버튼 클릭
		
		jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univMnrCd']").val('');
		jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univMnrNm']").val('');
		jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univgrdtMnrAfltCd']").val('');
		jQuery("#spanUniv").find("table").eq(menuNum-1).find("input[name='univgrdtMnrAfltCdNm']").val('');
		
	}
	else if(code == "04" && gubun == "masDelDmjr") {	// 대학원_석사 복수(이중전공) 삭제버튼 클릭		
		jQuery("#spanMaster").find("table").eq(menuNum-1).find("input[name='masDmjrCd']").val('');
		jQuery("#spanMaster").find("table").eq(menuNum-1).find("input[name='masDmjrNm']").val('');
		jQuery("#spanMaster").find("table").eq(menuNum-1).find("input[name='masgrdtDmjrAfltCd']").val('');
		jQuery("#spanMaster").find("table").eq(menuNum-1).find("input[name='masgrdtDmjrAfltCdNm']").val('');
		
	}
	else if(code == "04" && gubun == "masDelMnr") {	    // 대학원_석사 부전공 삭제버튼 클릭
		
		jQuery("#spanMaster").find("table").eq(menuNum-1).find("input[name='masMnrCd']").val('');
		jQuery("#spanMaster").find("table").eq(menuNum-1).find("input[name='masMnrNm']").val('');
		jQuery("#spanMaster").find("table").eq(menuNum-1).find("input[name='masgrdtMnrAfltCd']").val('');
		jQuery("#spanMaster").find("table").eq(menuNum-1).find("input[name='masgrdtMnrAfltCdNm']").val('');
		
	}
	else if(code == "05" && gubun == "docDelDmjr") {	// 대학원_박사 복수(이중전공) 삭제버튼 클릭		
		jQuery("#spanDoctor").find("table").eq(menuNum-1).find("input[name='docDmjrCd']").val('');
		jQuery("#spanDoctor").find("table").eq(menuNum-1).find("input[name='docDmjrNm']").val('');
		jQuery("#spanDoctor").find("table").eq(menuNum-1).find("input[name='docGrdtDmjrAfltCd']").val('');
		jQuery("#spanDoctor").find("table").eq(menuNum-1).find("input[name='docGrdtDmjrAfltCdNm']").val('');
		
	}
	else if(code == "05" && gubun == "docDelMnr") {	    // 대학원_박사 부전공 삭제버튼 클릭
		
		jQuery("#spanDoctor").find("table").eq(menuNum-1).find("input[name='docMnrCd']").val('');
		jQuery("#spanDoctor").find("table").eq(menuNum-1).find("input[name='docMnrNm']").val('');
		jQuery("#spanDoctor").find("table").eq(menuNum-1).find("input[name='docGrdtMnrAfltCd']").val('');
		jQuery("#spanDoctor").find("table").eq(menuNum-1).find("input[name='docGrdtMnrAfltCdNm']").val('');
		
	}
	else 
	{
		
	}
	
}


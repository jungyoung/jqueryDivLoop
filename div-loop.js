    /*
        #### 사용법 ####
        1. 반복(복사)될 element 에 "data-clone-grid" 속성 표시
        2. 주입시킬 테이터에 속성 추가  
        - 데이터 추가 : data-grid="title" 
            - 데이터가 object면 loop 돌면서 추가된다.
        - 클래스 추가 : data-grid-class="title_color"

        #### 작동순서 ####
        1. data-clone-grid 찾아서 복사한다.
        2. 복사한 element를 loop 돌면서 데이터를 주입힌다.
        3. 복사한 element를 data-clone-grid 하위요소로 추가한다.
    */
   const programGrid = (function($) { 
    if (!$) {
        return false;
    }

    const func = {
        getCloneElement : function (target) {
            return $(target).first().clone().show();
        },
        getGridElement : function (key, element) {
            return $("[data-grid='" + key + "']", element);
        },
        getGridClassElement : function (key, element) {
            return $("[data-grid-class='" + key + "']", element);
        },
        setGridData : function (programValue, $gridElement) {
            if (typeof programValue === 'object') {
                $isFirst = true;
                for (let k in programValue) {
                    // 첫번째 element는 복사하지 않고 사용한다.
                    if ($isFirst) {
                        $gridElement.text(programValue[k]);
                        $isFirst = false;
                    } else {
                        // 반복 elemet 복사
                        let cloneElementChild = func.getCloneElement($gridElement);
                        if (cloneElementChild.length) {
                            // 데이터 삽입
                            $(cloneElementChild).text(programValue[k]);
                            // 복사 element 추가
                            $gridElement.last().after(cloneElementChild);
                        }
                    }
                }
            } else {
                $gridElement.text(programValue);
            }
        },
        setGridClassData : function (programValue, $gridElement) {
            if ($gridElement.length) {
                $gridElement.addClass(programValue);
            }
        },
        setData : function (program, $cloneElement) {
            for (let key in program) {
                let programValue = program[key];

                // data-grid 찾아서 데이터를 넣어준다
                let $gridElement = func.getGridElement(key, $cloneElement);
                this.setGridData(programValue, $gridElement);

                // data-grid-class 찾아서 데이터를 넣어준다
                let $gridClassElement = func.getGridClassElement(key, $cloneElement);
                this.setGridClassData(programValue, $gridClassElement);
            }
        },
        hideOrignalGrid : function (orignalGrid) {
            $(orignalGrid).first().hide();
        }
    };
    
    // jquery 등록
    $.fn.programGrid = function (data) {
        
        func.hideOrignalGrid("[data-clone-grid]");

        for (let i = 0; i < data.length; i++) {
            let program = data[i];

            // 1.복사
            let $cloneElement = func.getCloneElement("[data-clone-grid]");

            // 2.데이터 삽입
            func.setData(program, $cloneElement);

            // 3.복사 element 추가
            $cloneElement.appendTo(this);
        }
    };

})(jQuery);

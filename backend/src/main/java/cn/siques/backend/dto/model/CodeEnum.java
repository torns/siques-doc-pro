package cn.siques.backend.dto.model;

/**
 * @author Shenghao he
 */
public enum CodeEnum {
    /** http状态码成功*/
    SUCCESS(1),
    /** http状态码失败*/
    ERROR(0),
    USER_EXIST(100),
    USER_NOT_EXIST(101);

    private Integer code;
    CodeEnum(Integer code){
        this.code = code;
    }

    public Integer getCode() {
        return code;
    }
}

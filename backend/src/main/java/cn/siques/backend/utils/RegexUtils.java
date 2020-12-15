package io.github.crawler.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author : heshenghao
 * @date : 13:02 2020/10/23
 */
public class RegexUtils {

    public static List<String> search(String regex,String text){
        Pattern compile = Pattern.compile(regex,Pattern.DOTALL   +   Pattern.MULTILINE);
        Matcher m = compile.matcher(text);
        ArrayList<String> list = new ArrayList<>();
        while (m.find()){
            list.add(m.group());
        }
        return list;
    }

    public static String searchOne(String regex,String text){
        List<String> s = search(regex, text);
        return s.size()==0?null:s.get(0);
    }

}

<?php
namespace App\Controller;

use App\Controller\AppController;
ini_set('memory_limit', '-1');


class CropAvatarController extends AppController {
    public $src;
    public $data;
    public $file;
    public $dst;
    public $type;
    public $img_name;
    public $extension;
    public $srcDir = WWW_ROOT;
    public $dstDir = WWW_ROOT;
    public $msg;

    public function index(){
        
        if($this->request->is('ajax')){
            $this->autoRender = false;
            $this->viewBuilder()->setLayout('ajax');
            $src = $_POST['avatar_src'];
            $data = $_POST['avatar_data'];
            $file = $_FILES['avatar_file'];
            $this -> setSrc($src);
            $this -> setData($data);
            $this -> setFile($file);
            $this -> crop($this -> src, $this -> dst, $this -> data);
            $response = array(
                'state'  => 200,
                'message' => $this->getMsg(),
                'result' => $this->getResult()
            );

            echo json_encode($response);
        }
    }
    public function setSrc($src) {
        if (!empty($src)) {
            $type = exif_imagetype($src);

            if ($type) {
                $this -> src = $src;
                $this -> type = $type;
                $this -> extension = image_type_to_extension($type);
                $this -> setDst();
            }
        }
    }

    public function setData($data) {
        if (!empty($data)) {
            $this -> data = json_decode(stripslashes($data));
        }
    }

    public function setFile($file) {
        $errorCode = $file['error'];
        if ($errorCode === UPLOAD_ERR_OK) {
            $type = exif_imagetype($file['tmp_name']);

            if ($type) {
                $dir = $this -> srcDir;
                $dir = $dir.'documentso';
                if (!file_exists($dir)) {
                    mkdir($dir, 0777);
                }

                $extension = image_type_to_extension($type);
                $img = date('YmdHis') . $extension;
                $src = $dir . '/' . $img;
                $this -> img_name  = $img;

                if ($type == IMAGETYPE_GIF || $type == IMAGETYPE_JPEG || $type == IMAGETYPE_PNG) {

                    if (file_exists($src)) {
                        unlink($src);
                    }

                    $result = move_uploaded_file($file['tmp_name'], $src);

                    if ($result) {
                        $this -> src = $src;
                        $this -> type = $type;
                        $this -> extension = $extension;
                        $this -> setDst();
                    } else {
                         $this -> msg = 'Failed to save file';
                    }
                } else {
                    $this -> msg = 'Please upload image with the following types: JPG, PNG, GIF';
                }
            } else {
                $this -> msg = 'Please upload image file';
            }
        } else {
            $this -> msg = $this -> codeToMessage($errorCode);
        }
    }

    public function setDst() {
        $dir = $this -> dstDir;
        $dir = $dir.'documents';
        if (!file_exists($dir)) {
            mkdir($dir, 0777);
        }

        $this -> dst = $dir . '/' . date('YmdHis') . $this -> extension;
    }

    public function crop($src, $dst, $data) {
        if (!empty($src) && !empty($dst) && !empty($data)) {
            switch ($this -> type) {
                case IMAGETYPE_GIF:
                    $src_img = imagecreatefromgif($src);
                    break;

                case IMAGETYPE_JPEG:
                    $src_img = imagecreatefromjpeg($src);
                    break;

                case IMAGETYPE_PNG:
                    $src_img = imagecreatefrompng($src);
                    break;
            }

            if (!$src_img) {
                $this -> msg = "Failed to read the image file";
                return;
            }

            $dst_img = imagecreatetruecolor(1359, 400);
            $result = imagecopyresampled($dst_img, $src_img, 0, 0, $data -> x, $data -> y, 1359, 400, $data -> width, $data -> height);

            if ($result) {
                switch ($this -> type) {
                    case IMAGETYPE_GIF:
                        $result = imagegif($dst_img, $dst);
                        break;

                    case IMAGETYPE_JPEG:
                        $result = imagejpeg($dst_img, $dst);
                        break;

                    case IMAGETYPE_PNG:
                        $result = imagepng($dst_img, $dst);
                        break;
                }

                if (!$result) {
                    $this -> msg = "Failed to save the cropped image file";
                }
            } else {
                $this -> msg = "Failed to crop the image file";
            }

            imagedestroy($src_img);
            imagedestroy($dst_img);
        }
    }

    public function codeToMessage($code) {
        switch ($code) {
            case UPLOAD_ERR_INI_SIZE:
                $message = 'The uploaded file exceeds the upload_max_filesize directive in php.ini';
                break;

            case UPLOAD_ERR_FORM_SIZE:
                $message = 'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form';
                break;

            case UPLOAD_ERR_PARTIAL:
                $message = 'The uploaded file was only partially uploaded';
                break;

            case UPLOAD_ERR_NO_FILE:
                $message = 'No file was uploaded';
                break;

            case UPLOAD_ERR_NO_TMP_DIR:
                $message = 'Missing a temporary folder';
                break;

            case UPLOAD_ERR_CANT_WRITE:
                $message = 'Failed to write file to disk';
                break;

            case UPLOAD_ERR_EXTENSION:
                $message = 'File upload stopped by extension';
                break;

            default:
                $message = 'Unknown upload error';
        }

        return $message;
    }

    public function getResult() {
        return $this -> img_name;
    }

    public function getMsg() {
        return $this -> msg;
    }
}
